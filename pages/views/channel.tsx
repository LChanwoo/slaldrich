import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatList from "../../components/ChatList";
import useInput from "../../hooks/useInput";
import makeSection from "../../utils/makeSection";
import fetcher from "../../utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import useSocket from "../../hooks/useSocket";
import Link from "next/link";
const PAGE_SIZE = 20;

    const Channel = () => {
        const router = useRouter();
        const { workspace, channel } = router.query;
        const [socket] = useSocket(workspace);
        const { data: userData } = useSWR('/api/users', fetcher);
        const { data: channelsData } = useSWR(`/api/workspaces/${workspace}/channels`, fetcher);
        const channelData = channelsData?.find((v) => v.name === channel);
        const { data: chatData, mutate: mutateChat, setSize } = useSWRInfinite(
          (index) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
          fetcher,
        );
        const { data: channelMembersData } = useSWR(
          userData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
          fetcher,
        );
        const [chat, onChangeChat, setChat] = useInput('');
        const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
        const scrollbarRef = useRef(null);
      
        const isEmpty = chatData?.[0]?.length === 0;
        const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE);
      
        const onCloseModal = useCallback(() => {
          setShowInviteChannelModal(false);
        }, []);
      
        const onSubmitForm = useCallback(
          (e) => {
            e.preventDefault();
            if (chat?.trim() && chatData && channelData && userData) {
              const savedChat = chat;
              mutateChat((prevChatData) => {
                prevChatData?.[0].unshift({
                  id: (chatData[0][0]?.id || 0) + 1,
                  content: savedChat,
                  UserId: userData.id,
                  User: userData,
                  createdAt: new Date(),
                  ChannelId: channelData.id,
                  Channel: channelData,
                });
                return prevChatData;
              }, false).then(() => {
                setChat('');
                if (scrollbarRef.current) {
                  console.log('scrollToBottom!', scrollbarRef.current?.getValues());
                  scrollbarRef.current.scrollToBottom();
                }
              });
              axios
                .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
                  content: savedChat,
                })
                .catch(console.error);
            }
          },
          [chat, workspace, channel, channelData, userData, chatData],
        );
      
        const onMessage = (data) => {
          if (data.Channel.name === channel && data.UserId !== userData?.id) {
            mutateChat((chatData) => {
              chatData?.[0].unshift(data);
              return chatData;
            }, false).then(() => {
              if (scrollbarRef.current) {
                if (
                  scrollbarRef.current.getScrollHeight() <
                  scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
                ) {
                  console.log('scrollToBottom!', scrollbarRef.current?.getValues());
                  scrollbarRef.current.scrollToBottom();
                } else {
                  toast.success('새 메시지가 도착했습니다.', {
                    onClick() {
                      scrollbarRef.current?.scrollToBottom();
                    },
                    closeOnClick: true,
                  });
                }
              }
            });
          }
        };
      
        useEffect(() => {
          socket?.on('message', onMessage);
          return () => {
            socket?.off('message', onMessage);
          };
        }, [socket, userData]);
      
        useEffect(() => {
          if (chatData?.length === 1) {
            console.log('toBottomWhenLoaded', chatData, scrollbarRef.current?.getValues());
            scrollbarRef.current?.scrollToBottom();
          }
        }, [chatData]);
      
        const onClickInviteChannel = useCallback(() => {
          setShowInviteChannelModal(true);
        }, []);
      
        if (channelsData && !channelData) {
          return <Link href={`/workspace/${workspace}/channel/일반`} />;
        }
      
        const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
    return  (
        <div className="flex flex-wrap h-screen flex-col">
            <div className="flex flex-wrap w-full h-16 bg-gray-800 shadow-sm p-5 font-bold items-center">
                <div className="flex, flex-1 justify-end items-center">
                    <span>{channelMembersData?.length}</span>
                    <button
                        onClick={onClickInviteChannel}
                        className="c-button-unstyled p-ia__view_header__button"
                        aria-label="Add people to #react-native"
                        data-sk="tooltip_parent"
                        type="button"
                    >
                        <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <ChatList
                scrollbarRef={scrollbarRef}
                isReachingEnd={isReachingEnd}
                isEmpty={isEmpty}
                chatSections={chatSections}
                setSize={setSize}
            />
        </div>
        
    );
};

export default Channel;