import { AppHeader } from '@/components';
import { Link } from 'react-router-dom';
import { useFindStore } from './findStore';
import EmailDisplay from './EmailDisplay';
import VerificationCodeInput from './VerificationCodeInput';
import PhoneNumberInput from './PhoneNumberInput';

export default function FindId() {
  const { isVerificationCodeInput, isShowEmail } = useFindStore((s) => ({
    isVerificationCodeInput: s.isVerificationCodeInput,

    isShowEmail: s.isShowEmail,
  }));

  return (
    <>
      <AppHeader>아이디 찾기</AppHeader>
      <section className="px-5 flex flex-col gap-5 my-20">
        <h2 className="sr-only">아이디 찾기 폼</h2>
        <PhoneNumberInput />
        {isVerificationCodeInput ? <VerificationCodeInput /> : null}
        {isShowEmail ? <EmailDisplay /> : null}
        <Link
          to={'/login'}
          className="text-center block border-2 border-borderPrimary border-solid text-md mb-10 rounded-md py-3 px-5"
        >
          로그인 하러가기
        </Link>
        <Link to={'/findPassword'} className="text-center block text-sm">
          비밀번호 찾기
        </Link>
      </section>
    </>
  );
}
