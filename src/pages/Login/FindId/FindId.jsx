import { AppHeader } from '@/components';
import { Link } from 'react-router-dom';
import { useFindStore } from './findStore';
import EmailDisplay from './EmailDisplay';
import VerificationCodeInput from './VerificationCodeInput';
import PhoneNumberInput from './PhoneNumberInput';
import AppMeta from '@/components/AppMeta';

export default function FindId() {
  const { isVerificationCodeInput, isShowEmail } = useFindStore((s) => ({
    isVerificationCodeInput: s.isVerificationCodeInput,

    isShowEmail: s.isShowEmail,
  }));

  return (
    <>
      <AppMeta
        title="아이디 찾기 페이지"
        description="아이디 찾기 페이지입니다."
      />
      <AppHeader>아이디 찾기</AppHeader>
      <section className="px-s20 flex flex-col gap-5 my-s80">
        <h2 className="sr-only">아이디 찾기 폼</h2>
        <PhoneNumberInput />
        {isVerificationCodeInput ? <VerificationCodeInput /> : null}
        {isShowEmail ? <EmailDisplay /> : null}
        <Link
          to={'/login'}
          className="text-center block border-2 border-mainColor border-solid text-md mb-s40 rounded py-s12 px-s20"
        >
          로그인 하러가기
        </Link>
        <Link to={'/findPassword'} className="text-center block text-f14">
          비밀번호 찾기
        </Link>
      </section>
    </>
  );
}
