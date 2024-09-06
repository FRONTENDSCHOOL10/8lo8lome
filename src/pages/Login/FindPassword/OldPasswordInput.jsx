import { AppPasswordInput, AppAuthMessage } from '@/components';
import { useFindPasswordStore } from './findPasswordStore';
import { memo } from 'react';

export function OldPasswordInput() {
  const {
    isNewPasswordInput,
    oldPasswordVerification,
    handleOldPasswordChange,
  } = useFindPasswordStore((s) => ({
    isNewPasswordInput: s.isNewPasswordInput,
    oldPasswordVerification: s.oldPasswordVerification,
    handleOldPasswordChange: s.handleOldPasswordChange,
  }));

  return (
    <>
      {isNewPasswordInput && (
        <div>
          <AppPasswordInput
            label="기존 비밀번호"
            placeholder="기존 비밀번호"
            isHiddenLabel
            className="w-full"
            onChange={handleOldPasswordChange}
          />
          {oldPasswordVerification && (
            <AppAuthMessage warning>
              비밀번호 양식은 문자와 숫자 8글자 이상입니다.
            </AppAuthMessage>
          )}
        </div>
      )}
    </>
  );
}

export default memo(OldPasswordInput);
