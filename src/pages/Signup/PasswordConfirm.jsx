import { AppAuthMessage, AppInput } from '@/components';
import { useSignupStore } from './store';

export function PasswordConfirm() {
  const { handlePasswordConfirmCheck, passwordConfirm } = useSignupStore(
    (s) => ({
      handlePasswordConfirmCheck: s.handleMethod.handlePasswordConfirmCheck,
      passwordConfirm: s.authMessages.passwordConfirm,
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
          onChange={handlePasswordConfirmCheck}
          required
          autocomplete="new-password"
        />
      </fieldset>
      {passwordConfirm && (
        <AppAuthMessage>비밀번호가 일치하지 않습니다.</AppAuthMessage>
      )}
    </article>
  );
}
