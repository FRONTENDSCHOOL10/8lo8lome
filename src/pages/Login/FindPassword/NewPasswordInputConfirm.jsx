import { AppPasswordInput, AppAuthMessage } from '@/components';
import { useFindPasswordStore } from './findPasswordStore';
import { memo } from 'react';

export function NewPasswordInputConfirm() {
  const {
    isNewPasswordInput,
    newPasswordConfirmVerification,
    handleNewPasswordConfirmChange,
  } = useFindPasswordStore((s) => ({
    isNewPasswordInput: s.isNewPasswordInput,
    newPasswordConfirmVerification: s.newPasswordConfirmVerification,
    handleNewPasswordConfirmChange: s.handleNewPasswordConfirmChange,
  }));

  return (
    <>
      {isNewPasswordInput && (
        <div>
          <AppPasswordInput
            label="새로운 비밀번호 확인"
            placeholder="새로운 비밀번호 확인"
            isHiddenLabel
            className="w-full"
            onChange={handleNewPasswordConfirmChange}
          />
          {newPasswordConfirmVerification && (
            <AppAuthMessage warning>
              비밀번호가 일치하지 않습니다.
            </AppAuthMessage>
          )}
        </div>
      )}
    </>
  );
}

export default memo(NewPasswordInputConfirm);
