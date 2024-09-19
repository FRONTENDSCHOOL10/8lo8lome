import { AppButton, AppHeader, AppDivider, AppStatusPage } from '@/components';
import { useSignupStore } from '@/stores/signStore';
import Nickname from './Nickname.jsx';
import Email from './Email.jsx';
import PhoneNumber from './PhoneNumber.jsx';
import Password from './Password.jsx';
import PasswordConfirm from './PasswordConfirm';
import Gender from './Gender.jsx';
import Age from './Age.jsx';
import AgreementTerms from './AgreementTerms.jsx';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';

function Signup() {
  const { isSignupButtonDisabled, handleSignupButtonClick, isSignup } =
    useSignupStore((s) => ({
      isSignupButtonDisabled: s.isSignupButtonDisabled,
      handleSignupButtonClick: s.handleMethod.handleSignupButtonClick,
      isSignup: s.isSignup,
    }));

  if (isSignup) {
    return <AppStatusPage status="signup" />;
  }

  return (
    <>
      <AppMeta title="회원가입 페이지" description="회원가입 페이지입니다." />
      <AppHeader>회원가입</AppHeader>
      <form
        className="bg-mainBg px-s18 flex flex-col gap-s30 mb-s50 mt-[110px]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignupButtonClick();
        }}
      >
        <div className="flex flex-col gap-4">
          <Nickname />
          <Email />
          <PhoneNumber />
          <Password />
          <PasswordConfirm />
        </div>
        <Gender />
        <Age />
        <AppDivider className="w-full" />
        <AgreementTerms />
        <AppButton disabled={isSignupButtonDisabled} submit>
          회원가입
        </AppButton>
      </form>
    </>
  );
}

export default memo(Signup);
