import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl">
        <img
          src="data:image/png;base64,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"
          alt="로고"
        />
      </h1>
      <div className="flex flex-col">
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/main">지점 둘러보기</Link>
      </div>
    </div>
  );
}
