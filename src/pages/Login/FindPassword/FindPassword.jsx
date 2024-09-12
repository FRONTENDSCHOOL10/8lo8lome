import EmailInput from './EmailInput';
import NewPasswordInput from './NewPasswordInput';
import NewPasswordInputConfirm from './NewPasswordInputConfirm';
import OldPasswordInput from './OldPasswordInput';

import { AppHeader, AppButton, AppStatusPage, AppMeta } from '@/components';
import { useFindPasswordStore } from '@/stores/findPasswordStore';
import { Link } from 'react-router-dom';
import { memo, useEffect } from 'react';

import toast from 'react-hot-toast';

function FindPassword() {
  const { handlePasswordChangeButtonClick, isChangePassword } =
    useFindPasswordStore((s) => ({
      handlePasswordChangeButtonClick: s.handlePasswordChangeButtonClick,
      isChangePassword: s.isChangePassword,
    }));

  useEffect(() => {
    if (isChangePassword === false) {
      toast.error('기존 비밀번호를 확인해 주세요', {
        style: {
          borderRadius: '5px',
          background: 'black',
          color: '#fff',
        },
        duration: 1000,
      });
    }
  }, [isChangePassword]);

  if (isChangePassword === true) {
    return <AppStatusPage status="changePassword" />;
  }

  return (
    <>
      <AppMeta
        title="비밀번호 변경 페이지"
        description="비밀번호 변경 페이지입니다."
      />
      <AppHeader>비밀번호 변경</AppHeader>
      <section className="px-s20 flex flex-col gap-4 mb-s82 mt-[100px]">
        <h2 className="sr-only">비밀번호 변경 폼</h2>
        <EmailInput />
        <OldPasswordInput />
        <NewPasswordInput />
        <NewPasswordInputConfirm />
        <AppButton isFilled onClick={handlePasswordChangeButtonClick}>
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
