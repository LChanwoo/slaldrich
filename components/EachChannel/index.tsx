import { IChannel, IUser } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import React, { useEffect, VFC } from 'react';
import { useParams } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  channel: IChannel;
}
const EachChannel: VFC<Props> = ({ channel }) => {
  // const { workspace } = useParams<{ workspace?: string }>();
  const router = useRouter();
  const [,,workspace] = router.asPath.split('/');
  const location = router.asPath;
  console.log(location)
  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const date = localStorage.getItem(`${workspace}-${channel.name}`) || 0;
  const { data: count, mutate } = useSWR<number>(
    userData ? `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}` : null,
    fetcher,
  );

  useEffect(() => {
    if (location === `/workspace/${workspace}/channel/${channel.name}`) {
      mutate(0);
    }
  }, [mutate, location, workspace, channel]);

  return (
    <Link key={channel.name}  href={`/workspace/${workspace}/channel/${channel.name}`} replace>
      <button className='ml-10 block'>
      <span className={count !== undefined && count > 0 ? 'bold' : undefined}># {channel.name}</span>
      {count !== undefined && count > 0 && <span className="count">{count}</span>}
      </button>
    </Link>
  );
};

export default EachChannel;
