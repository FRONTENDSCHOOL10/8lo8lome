import AppMeta from '@/components/AppMeta';
import EmailInput from './EmailInput';
import NewPasswordInput from './NewPasswordInput';
import { AppHeader, AppButton } from '@/components';
import { useFindPasswordStore } from '@/stores/findPasswordStore';

import { Link } from 'react-router-dom';
import { memo } from 'react';

import NewPasswordInputConfirm from './NewPasswordInputConfirm';
import OldPasswordInput from './OldPasswordInput';

function FindPassword() {
  const { handlePasswordResetRequest, handlePasswordResetConfirmation } =
    useFindPasswordStore((s) => ({
      handlePasswordResetRequest: s.handlePasswordResetRequest,
      handlePasswordResetConfirmation: s.handlePasswordResetConfirmation,
    }));

  const onResetPasswordRequest = async () => {
    await handlePasswordResetRequest();
    await handlePasswordResetConfirmation();
  };

  return (
    <>
      <AppMeta
        title="비밀번호 변경 페이지"
        description="비밀번호 변경 페이지입니다."
      />
      <AppHeader>비밀번호 변경</AppHeader>
      <section className="px-s20 flex flex-col gap-4 my-s82">
        <h2 className="sr-only">비밀번호 변경 폼</h2>
        <EmailInput />
        <OldPasswordInput />
        <NewPasswordInput />
        <NewPasswordInputConfirm />
        <AppButton isFilled onClick={onResetPasswordRequest}>
          비밀번호 변경
        </AppButton>
        <Link to={'/findId'} className="text-center block text-f14">
          아이디 찾기
        </Link>
      </section>
    </>
  );
}

export default memo(FindPassword);
