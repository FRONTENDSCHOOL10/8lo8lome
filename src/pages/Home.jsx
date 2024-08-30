import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">
        <img src="" alt="로고" />
      </h1>
      <div className="flex flex-col">
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/main">지점 둘러보기</Link>
      </div>
    </div>
  );
}
