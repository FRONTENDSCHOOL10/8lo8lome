import { memo } from 'react';
import { Link } from 'react-router-dom';

function AuthLinks() {
  const defaultClass = 'text-f12';

  return (
    <ul className="flex justify-center gap-2">
      <li>
        <Link to={'/findId'} className={defaultClass}>
          아이디 찾기
        </Link>
      </li>
      <li aria-hidden="true" className="pt-[1px]">
        |
      </li>
      <li>
        <Link to={'/signup'} className={defaultClass}>
          회원가입
        </Link>
      </li>
    </ul>
  );
}
export default memo(AuthLinks);
