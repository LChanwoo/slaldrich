import { ChatWrapper } from '../Chat/styles';
import { IChat, IDM, IUser } from '../../typings/db';
import dayjs from 'dayjs';
import gravatar from 'gravatar';
import React, { FC, useMemo, memo } from 'react';
import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
import regexifyString from 'regexify-string';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  data: IDM | IChat;
}

const BACK_URL =  'http://localhost:3095' ;
const Chat: FC<Props> = memo(({ data }) => {
  // console.log("data",data)
  // const { workspace } = useParams<{ workspace: string; channel: string }>();
  const router = useRouter();
  const [,,workspace] = router.asPath.split('/');
  const user: IUser = 'sender' in data ? data.sender : data.user;
  const result = useMemo<(string | JSX.Element)[] | JSX.Element>(
    () =>
      data.content.startsWith('public\\uploads\\') || data.content.startsWith('public/uploads/') ? (
        <img src={`${BACK_URL}/${data.content.replace('public/','')}`} style={{ maxHeight: 200 }} />
      ) : (
        regexifyString({
          pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
          decorator(match, index) {
            const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;
            if (arr) {
              return (
                <a  href={`/workspace/${workspace}/dm/${arr[2]}`}>
                  @{arr[1]}
                </a>
              );
            }
            return <br key={index} />;
          },
          input: data.content,
        })
      ),
    [workspace, data.content],
  );

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user jus">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
});

export default Chat;
