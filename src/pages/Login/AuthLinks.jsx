import { Link } from 'react-router-dom';

export function AuthLinks() {
  const defaultClass = 'text-xs';

  return (
    <ul className="flex justify-center gap-2">
      <li>
        <Link to={'/findId'} className={defaultClass}>
          아이디 찾기
        </Link>
      </li>
      <li aria-hidden="true">|</li>
      <li>
        <Link to={'/findPassword'} className={defaultClass}>
          비밀번호 찾기
        </Link>
      </li>
      <li aria-hidden="true">|</li>
      <li>
        <Link to={'/signup'} className={defaultClass}>
          회원가입
        </Link>
      </li>
    </ul>
  );
}
