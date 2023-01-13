import { FC } from 'react';
import Link from 'next/link';

const Sidebar: FC = () => {
  return (
    <>
      <div className='border-b-2 border-b-bblack-600 p-2 text-base font-extrabold uppercase ' >
        <Link href="/views/home" as="/">
            Slaldrich 워크스페이스
        </Link>
      </div>
      {/* 채널 */}
      <ul className='p-2'>
        채널
        <li className='py-1'>
          <Link href="/views/home" as="/">
            <a># Home</a>
          </Link>
        </li>
        <li className='py-1'>
          <Link href="/views/about" as="/about">
            <a># About</a>
          </Link>
        </li>
        <li className='py-1'>
          <Link href="/views/blog" as="/blog" prefetch={false}>
            <a># Blog</a>
          </Link>
        </li>
      </ul>
      {/* 다이렉트메시지 */}
      <ul className='p-2'>
        다이렉트 메시지
        <li className='py-1'>
          <Link href="/views/home" as="/">
            <a># 서명인</a>
          </Link>
        </li>
        <li className='py-1'>
          <Link href="/views/about" as="/about">
            <a># 이찬우</a>
          </Link>
        </li>
        <li className='py-1'>
          <Link href="/views/blog" as="/blog" prefetch={false}>
            <a># 조경철</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
