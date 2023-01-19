import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import Sidebar from '../components/sidebar';
import NavBar from '../components/NavBar';
import WokrspaceBar from '../components/WorkspaceBar';
import '../styles/global.css';
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
    asds
    <NavBar/>
    <div className='flex w-screen'>
      <WokrspaceBar/>
      <div className='hidden h-screen basis-1/3 border-r-black-600 border-r-2  md:block' style={{maxWidth:"200px"}}>
        <Sidebar />
      </div>
      <div className='m-6 w-screen md:basis-full'>
        <Component {...pageProps} />
      </div>
    </div>
    </>
  );
};

export default MyApp;
