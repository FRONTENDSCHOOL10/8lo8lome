import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <button onClick={handleGoBack()}></button>
      <h1 className="text-3xl">로그인 페이지</h1>
    </>
  );
}
