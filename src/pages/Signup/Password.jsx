import { AppAuthMessage, AppPasswordInput } from '@/components';
import { useSignupStore } from './signStore';
import { memo } from 'react';

function Password() {
  const { handlePasswordChange, passwordVerification } = useSignupStore(
    (s) => ({
      handlePasswordChange: s.handleMethod.handlePasswordChange,
      passwordVerification: s.authMessages.passwordVerification,
    })
  );

  return (
    <article>
      <h2 className="sr-only">비밀번호 입력</h2>
      <fieldset className="flex gap-3">
        <AppPasswordInput
          label="비밀번호"
          placeholder="비밀번호"
          isHiddenLabel
          className={'w-full'}
          onChange={handlePasswordChange}
          required
        />
      </fieldset>
      {passwordVerification && (
        <AppAuthMessage warning>
          비밀번호 양식은 문자와 숫자 8글자 이상입니다.
        </AppAuthMessage>
      )}
    </article>
  );
}

export default memo(Password);
