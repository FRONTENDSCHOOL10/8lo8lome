// import { AppDivider, AppLink } from '@/components';
import { Link } from 'react-router-dom';
import GymList from './GymList';
import { AppNav, AppInput } from '@/components';
import AppMeta from '@/components/AppMeta';

export default function Main() {
  return (
    <>
      <AppMeta title="메인페이지" description="메인페이지입니다." />

      <header className="flex items-center gap-1 m-4">
        <h1 className="sr-only">다있짐 메인페이지</h1>
        <form
          action=""
          className="flex items-center grow gap-3 p-2 border-b-[0.0625rem] border-solid border-borderPrimary"
        >
          <AppInput
            label={'검색'}
            isHiddenLabel
            placeholder="검색어를 입력해 주세요."
            className="bg-transparent outline-none grow text-sm border-0"
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
