import { AppPasswordInput, AppAuthMessage } from '@/components';
import { useFindPasswordStore } from './findPasswordStore';
import { memo } from 'react';

export function NewPasswordInput() {
  const { isNewPasswordInput, passwordVerification, handlePasswordChange } =
    useFindPasswordStore((s) => ({
      isNewPasswordInput: s.isNewPasswordInput,
      passwordVerification: s.passwordVerification,
      handlePasswordChange: s.handlePasswordChange,
    }));

  return (
    <>
      {isNewPasswordInput && (
        <>
          <AppPasswordInput
            label="새로운 비밀번호"
            placeholder="새로운 비밀번호"
            isHiddenLabel
            className="w-full"
            onChange={handlePasswordChange}
          />
          {passwordVerification && (
            <AppAuthMessage warning>
              비밀번호 양식은 문자와 숫자 8글자 이상입니다.
            </AppAuthMessage>
          )}
        </>
      )}
    </>
  );
}

export default memo(NewPasswordInput);
