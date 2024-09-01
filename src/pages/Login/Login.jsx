import { Link } from 'react-router-dom';
import { AppButton, AppHeader, AppInput } from '@/components';
import AppAuthMessage from './../../components/AppAuthMessage';
export default function Login() {
  return (
    <>
      <AppHeader>로그인</AppHeader>
      <section className="px-5 border border-1 border-red-500">
        <form action="" className="my-20 flex flex-col gap-4">
          <div>
            <AppInput
              label="이메일"
              email
              isHiddenLabel
              placeholder="이메일"
              className={'w-full'}
            />
            <AppAuthMessage>이메일 양식이 맞지 않습니다.</AppAuthMessage>
          </div>
          <div>
            <AppInput
              label="비밀번호"
              password
              isHiddenLabel
              placeholder="비밀번호"
              className={'w-full'}
            />
            <AppAuthMessage>
              아이디 혹은 비밀번호가 맞지 않습니다.
            </AppAuthMessage>
          </div>

          <AppInput label="자동 로그인" checkbox />
        </form>
        <AppButton submit className="mb-[48px]">
          로그인
        </AppButton>
        <ul className="flex justify-center gap-2">
          <li>
            <Link to={'/findId'} className="text-xs">
              아이디 찾기
            </Link>
          </li>
          <li aria-hidden="true">|</li>
          <li>
            <Link to={'/findPassword'} className="text-xs">
              비밀번호 찾기
            </Link>
          </li>
          <li aria-hidden="true">|</li>
          <li>
            <Link to={'/signup'} className="text-xs">
              회원가입
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
