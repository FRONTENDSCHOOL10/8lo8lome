import { AppPasswordInput, AppAuthMessage } from '@/components';
import { useFindPasswordStore } from '@/stores/findPasswordStore';
import { memo } from 'react';

export function NewPasswordInput() {
  const {
    isNewPasswordInput,
    newPasswordVerification,
    handleNewPasswordChange,
  } = useFindPasswordStore((s) => ({
    isNewPasswordInput: s.isNewPasswordInput,
    newPasswordVerification: s.newPasswordVerification,
    handleNewPasswordChange: s.handleNewPasswordChange,
  }));

  return (
    <>
      {isNewPasswordInput && (
        <div>
          <AppPasswordInput
            label="새로운 비밀번호"
            placeholder="새로운 비밀번호"
            isHiddenLabel
            className="w-full"
            onChange={handleNewPasswordChange}
          />
          {newPasswordVerification && (
            <AppAuthMessage warning>
              비밀번호 양식은 문자와 숫자 8글자 이상입니다.
            </AppAuthMessage>
          )}
        </div>
      )}
    </>
  );
}

export default memo(NewPasswordInput);
