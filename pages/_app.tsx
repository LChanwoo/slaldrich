import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import useSWR from 'swr';
import '../styles/global.css';
import fetcher from 'utils/fetcher';
import LogIn from './views/Login';
import { useRouter } from 'next/router';
import Workspace from './views/Workspace';
const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const { data: userData } = useSWR('/api/users', fetcher);
  if(!userData) {
    return <LogIn/>
  }
  return (
    <>
        <Component {...pageProps} />
    </>

  );
};

export default MyApp;
