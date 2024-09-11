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
      {/* <li aria-hidden="true">|</li>
      <li>
        <Link to={'/findPassword'} className={defaultClass}>
          비밀번호 변경
        </Link>
      </li> */}
      <li aria-hidden="true">|</li>
      <li>
        <Link to={'/signup'} className={defaultClass}>
          회원가입
        </Link>
      </li>
      <li aria-hidden="true">|</li>
      <li>
        <Link to={'/main'} className={defaultClass}>
          지점 둘러보기
        </Link>
      </li>
    </ul>
  );
}
export default memo(AuthLinks);
