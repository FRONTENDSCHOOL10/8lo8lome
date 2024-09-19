import { memo } from 'react';
import { Link } from 'react-router-dom';
import AppMeta from '@/components/AppMeta';

function Home() {
  const LinkClass =
    'flex items-center justify-center py-s14 text-f12 rounded w-full font-bold ';
  return (
    <>
      <AppMeta title="다있짐 홈 페이지" description="다있짐 홈 페이지입니다." />
      <section className="h-[100vh] bg-[url('../assets/bg.avif')] bg-no-repeat bg-cover bg-right-top flex flex-col justify-evenly gap-20 pt-s98 pb-s50">
        <div>
          <svg
            className={`w-[200px] h-[200px] mx-auto mb-s12 text-mainColor`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <use href={`../assets/sprite.svg#logo1-2`} />
          </svg>
          <h1 className="text-[50px] text-center text-mainColor font-bold">
            다있짐
          </h1>
        </div>
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
