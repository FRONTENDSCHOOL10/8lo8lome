import { Link } from 'react-router-dom';

export default function Home() {
  const LinkClass =
    'flex items-center justify-center py-s12 text-f12 rounded w-full font-bold ';
  return (
    <section className="min-h-[600px] bg-[url('../assets/bg.avif')] bg-no-repeat bg-cover bg-right-top flex flex-col justify-evenly gap-20 pt-s98 pb-s50">
      <h1 className="mx-auto">
        <img width={200} height={125} src="../assets/logo.svg" alt="다있짐" />
      </h1>
      <div className="flex flex-col justify-center items-center gap-[10px] px-s12">
        <Link to="/signup" className={LinkClass + `bg-mainColor text-black`}>
          가입하기
        </Link>
        <Link
          to="/login"
          className={LinkClass + `border-2 border-solid border-mainColor`}
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
