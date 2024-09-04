import { AppAuthMessage, AppInput } from '@/components';
import { useSignupStore } from './store';

export function PasswordConfirm() {
  const { handlePasswordConfirmChange, confirmPassword } = useSignupStore(
    (s) => ({
      handlePasswordConfirmChange: s.handleMethod.handlePasswordConfirmChange,
      confirmPassword: s.authMessages.confirmPassword,
    })
  );

  return (
    <article>
      <h2 className="sr-only">비밀번호 확인 입력</h2>
      <fieldset className="flex gap-3">
        <AppInput
          label="비밀번호확인"
          placeholder="비밀번호확인"
          isHiddenLabel
          password
          className={'w-full'}
          onChange={handlePasswordConfirmChange}
          required
        />
      </fieldset>
      {confirmPassword && (
        <AppAuthMessage warning>비밀번호가 일치하지 않습니다.</AppAuthMessage>
      )}
    </article>
  );
}
