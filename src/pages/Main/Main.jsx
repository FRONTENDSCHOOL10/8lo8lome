// import { AppDivider, AppLink } from '@/components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import GymList from './GymList';
import { AppNav } from '@/components';

export default function Main() {
  return (
    <>
      <Helmet>
        <title>다있짐 / 메인페이지</title>
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
      <header className="flex items-center gap-1 m-4">
        <form action="" className="flex items-center grow gap-3 p-2">
          <label htmlFor="search" className="sr-only">
            검색
          </label>
          <input
            id="search"
            type="text"
            placeholder="검색어를 입력해 주세요."
            className="bg-transparent outline-none grow text-sm"
          />
          <button type="submit" aria-label="검색">
            <svg
              role="icon"
              aria-label="검색하기"
              className="w-6 h-6 fill-white"
            >
              <use href="/public/assets/sprite.svg#search" />
            </svg>
          </button>
        </form>

        <Link to={'/map'} aria-label="지도로 보기">
          <svg
            role="icon"
            aria-label="지도로 보기"
            className="w-[1.4375rem] h-[1.4375rem] fill-white"
          >
            <use href="/public/assets/sprite.svg#map2" />
          </svg>
        </Link>
      </header>

      <GymList />
      <AppNav />
    </>
  );
}
