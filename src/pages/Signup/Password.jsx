import { AppAuthMessage, AppPasswordInput } from '@/components';
import { useSignupStore } from '@/stores/signStore';
import { memo } from 'react';

function Password() {
  const { handlePasswordChange, passwordVerification } = useSignupStore(
    (s) => ({
      handlePasswordChange: s.handleMethod.handlePasswordChange,
      passwordVerification: s.authMessages.passwordVerification,
    })
  );
  const isShow = passwordVerification ? 'block' : 'hidden';

  return (
    <article>
      <fieldset className="flex gap-3">
        <legend className="sr-only">비밀번호 입력</legend>
        <AppPasswordInput
          label="비밀번호"
          placeholder="비밀번호"
          isHiddenLabel
          className={'w-full'}
          onChange={handlePasswordChange}
          required
        />
      </fieldset>
      <AppAuthMessage warning className={isShow}>
        비밀번호 양식은 문자와 숫자 8글자 이상입니다.
      </AppAuthMessage>
    </article>
  );
}

export default memo(Password);
