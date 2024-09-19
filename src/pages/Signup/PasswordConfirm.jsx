import { AppAuthMessage, AppPasswordInput } from '@/components';
import { useSignupStore } from '@/stores/signStore';
import { memo } from 'react';

function PasswordConfirm() {
  const { handlePasswordConfirmChange, confirmPassword } = useSignupStore(
    (s) => ({
      handlePasswordConfirmChange: s.handleMethod.handlePasswordConfirmChange,
      confirmPassword: s.authMessages.confirmPassword,
    })
  );

  const isShow = confirmPassword ? 'block' : 'hidden';

  return (
    <article>
      <fieldset className="flex gap-3">
        <legend className="sr-only">비밀번호 확인 입력</legend>
        <AppPasswordInput
          label="비밀번호확인"
          placeholder="비밀번호확인"
          isHiddenLabel
          className={'w-full'}
          onChange={handlePasswordConfirmChange}
          required
        />
      </fieldset>
      <AppAuthMessage warning className={isShow}>
        비밀번호가 일치하지 않습니다.
      </AppAuthMessage>
    </article>
  );
}

export default memo(PasswordConfirm);
