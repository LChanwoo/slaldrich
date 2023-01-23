import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import useSWR from 'swr';
import '../styles/global.css';
// import '../styles/client-boot-styles.97ae0af.css';
// import '../styles/slack-kit-styles.0af9bca.css';
import fetcher from 'utils/fetcher';
import { useRouter } from 'next/router';
import Workspace from '../pages/views/Workspace';
const MyApp = ({ Component, pageProps }) => {
  // const router = useRouter();
  // const { data: userData } = useSWR('/api/users', fetcher);

  return (
        <Component {...pageProps} />
  );
};

export default MyApp;
