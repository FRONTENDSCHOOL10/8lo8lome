import { AppNav } from '@/components';
import { Helmet } from 'react-helmet-async';

export default function Chat() {
  return (
    <>
      <Helmet>
        <title>다있짐 / 채팅</title>
        <meta
          name="description"
          content="Zustand를 사용하면 Context, useReducer, useState 없이 보다 효과적으로, 더 빠르게, 더 가볍게 상태를 관리할 수 있습니다."
        />
        <meta property="og:title" content="이듬(E.UID) 블렌디드 러닝" />
        <meta property="twitter:title" content="이듬(E.UID) 블렌디드 러닝" />
        <meta property="og:type" content="site" />
        <meta property="og:url" content="https://yamoo9.github.io/EUID" />
        <meta
          property="og:description"
          content="Front-End 개발자를 꿈꾸는 이들을 위한 블렌디드 러닝으로 개발에 필요한 모든 것!"
        />
        <meta
          property="og:image"
          content="https://yamoo9.github.io/EUID/og-image.jpg"
        />
        <meta property="og:site:author" content="야무(yamoo9)" />
      </Helmet>
      <h1 className="text-3xl">채팅 페이지입니다</h1>
      <AppNav></AppNav>
    </>
  );
}
