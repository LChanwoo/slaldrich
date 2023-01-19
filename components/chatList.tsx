import React, { useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Chat from './chat';
const ChatList = ({ scrollbarRef, isReachingEnd, isEmpty, chatSections, setSize }) => {
  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {
        setSize((size) => size + 1).then(() => {
          scrollbarRef.current?.scrollTop(scrollbarRef.current?.getScrollHeight() - values.scrollHeight);
        });
      }
    },
    [setSize, scrollbarRef, isReachingEnd, isEmpty],
  );

  return (
    <div className='w-full flex flex-1'>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats] : any) => {
          return (
            <div  className={`mt-5 border-t section-${date}`} key={date}>
              <div className='flex items-center flex-1 w-full sticky top-4'>
                <button>{date}</button>
              </div>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </div>
          );
        })}
      </Scrollbars>
    </div>
  );
};

export default ChatList;
