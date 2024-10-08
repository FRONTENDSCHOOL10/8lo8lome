import { AppHeader } from '@/components';
import { Link } from 'react-router-dom';
import { useFindIdStore } from '@/stores/findIdStore';
import EmailDisplay from './EmailDisplay';
import VerificationCodeInput from './VerificationCodeInput';
import PhoneNumberInput from './PhoneNumberInput';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function FindId() {
  const { isVerificationCodeInput, isShowEmail } = useFindIdStore((s) => ({
    isVerificationCodeInput: s.isVerificationCodeInput,

    isShowEmail: s.isShowEmail,
  }));

  return (
    <>
      <AppMeta
        title="이메일 찾기 페이지"
        description="이메일 찾기 페이지입니다."
      />
      <AppHeader>이메일 찾기</AppHeader>
      <section className="px-s20 flex flex-col gap-5 my-s82 mt-[100px]">
        <h2 className="sr-only">이메일 찾기 폼</h2>
        <PhoneNumberInput />
        {isVerificationCodeInput ? <VerificationCodeInput /> : null}
        {isShowEmail ? <EmailDisplay /> : null}
        <Link
          to={'/login'}
          className="text-center block bg-mainColor text-black text-f14 font-semibold mb-s40 rounded py-s12 px-s20"
        >
          로그인 하러가기
        </Link>
      </section>
    </>
  );
}
export default memo(FindId);
