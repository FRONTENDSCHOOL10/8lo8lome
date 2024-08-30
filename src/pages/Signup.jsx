import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <button onClick={handleGoBack()}></button>
      <h1 className="text-3xl">회원가입 페이지</h1>
    </>
  );
}
