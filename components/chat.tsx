import dayjs from 'dayjs';
import gravatar from 'gravatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, memo } from 'react';
import regexifyString from 'regexify-string';

const Chat = memo(({ data } :any) => {
    const router = useRouter();
    const { workspace } = router.query;
    const user = 'Sender' in data ? data.Sender : data.User;

    const result = useMemo(
        () =>
        regexifyString({
            pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
            decorator(match, index) {
            const arr = match.match(/@\[(.+?)]\((\d+?)\)/);
            if (arr) {
                return (
                <Link key={match + index} href={`/workspace/${workspace}/dm/${arr[2]}`}>
                    @{arr[1]}
                </Link>
                );
            }
            return <br key={index} />;
            },
            input: data.content,
        }),
        [data.content],
    );

    return (
        <div className='flex pt-2 pb-5'>
            <div className="flex w-9 mr-2">
                <img className="w-9 h-9" src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
            </div>
            <div className="flex flex-wrap flex-1">
                <div className="flex flex-initial items-center">
                    <b className='m-1'>{user.nickname}</b>
                    <span className='text-xs'>{dayjs(data.createdAt).format('h:mm A')}</span>
                </div>
                <p className='flex-initial m-0'>{result}</p>
            </div>
        </div>
    );
});

export default Chat;
