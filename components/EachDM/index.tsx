import { IUser } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import React, { useEffect, VFC } from 'react';
import { useParams } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import {Router} from 'react-router';
import Link from 'next/link';
interface Props {
  member: IUser;
  isOnline: boolean;
}
const EachDM: VFC<Props> = ({ member, isOnline }) => {
  // const { workspace } = useParams<{ workspace?: string }>();
  const router = useRouter();
  const [,,workspace] = router.asPath.split('/');
  const location = router.asPath;
  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const date = localStorage.getItem(`${workspace}-${member.id}`) || 0;
  const { data: count, mutate } = useSWR<number>(
    userData ? `/api/workspaces/${workspace}/dms/${member.id}/unreads?after=${date}` : null,
    fetcher,
  );

  useEffect(() => {
    if (location === `/workspace/${workspace}/dm/${member.id}`) {
      mutate(0);
    }
  }, [mutate, location, workspace, member]);

  return (
    <Link href={`/workspace/${workspace}/dm/${member.id}`}>
      <button className='ml-10 block'>
        <i
          className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
            isOnline ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
          }`}
          aria-hidden="true"
          data-qa="presence_indicator"
          data-qa-presence-self="false"
          data-qa-presence-active="false"
          data-qa-presence-dnd="false"
        />
        <span className={count && count > 0 ? 'bold' : undefined}>{member.nickname}</span>
        {member.id === userData?.id && <span> (나)</span>}
        {(count && count > 0 && <span className="count">{count}</span>) || null}
      </button>
    </Link>
  );
};

export default EachDM;
