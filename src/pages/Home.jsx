import { Link } from 'react-router-dom';

export default function Home() {
  const LinkClass =
    'flex items-center justify-center py-3 text-[12px] rounded-md w-full font-bold ';
  return (
    <section className="min-h-[600px] bg-[url('../assets/bg.avif')] bg-no-repeat bg-cover bg-right-top flex flex-col justify-evenly gap-20 pt-[100px] pb-[50px]">
      <h1 className="mx-auto">
        <img width={200} height={125} src="../assets/logo.svg" alt="로고" />
      </h1>
      <div className="flex flex-col justify-center items-center gap-[10px] px-3">
        <Link to="/signup" className={LinkClass + `bg-primary text-black`}>
          가입하기
        </Link>
        <Link
          to="/login"
          className={LinkClass + `border-2 border-solid border-primary`}
        >
          로그인하기
        </Link>
        <Link to="/main" className={LinkClass + `font-normal`}>
          지점 둘러보기
        </Link>
      </div>
    </section>
  );
}
