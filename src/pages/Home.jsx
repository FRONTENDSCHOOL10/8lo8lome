import { memo } from 'react';
import { Link } from 'react-router-dom';
import AppMeta from '@/components/AppMeta';

function Home() {
  const LinkClass =
    'flex items-center justify-center py-s14 text-f12 rounded w-full font-bold ';
  return (
    <>
      <AppMeta title="다있짐 홈 페이지" description="다있짐 홈 페이지입니다." />
      <section className="h-[100vh] bg-mainBg flex flex-col justify-evenly gap-20 pt-s98 pb-s50 ">
        <h1 className="sr-only">다있짐</h1>
        <img
          src="/assets/home.png"
          alt=""
          className="max-w-[400px] mx-auto w-[80%]"
        />
        <div className="flex flex-col justify-center items-center gap-[10px] px-s12">
          <Link to="/signup" className={LinkClass + `bg-mainColor text-black`}>
            가입하기
          </Link>
          <Link
            to="/login"
            className={
              LinkClass + `border-2 border-solid border-mainColor bg-mainBg`
            }
          >
            로그인하기
          </Link>
          <Link to="/main" className={LinkClass + `font-normal`}>
            지점 둘러보기
          </Link>
        </div>
      </section>
    </>
  );
}

export default memo(Home);
