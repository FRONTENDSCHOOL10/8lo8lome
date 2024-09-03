import { AppAuthMessage, AppInput } from '@/components';
import { useSignupStore } from './store';

export function Password() {
  const { handlePasswordCheck, passwordVerification } = useSignupStore((s) => ({
    handlePasswordCheck: s.handleMethod.handlePasswordCheck,
    passwordVerification: s.authMessages.passwordVerification,
  }));

  return (
    <article>
      <h2 className="sr-only">비밀번호 입력</h2>
      <fieldset className="flex gap-3">
        <AppInput
          label="비밀번호"
          placeholder="비밀번호"
          isHiddenLabel
          password
          className={'w-full'}
          onChange={handlePasswordCheck}
          required
        />
      </fieldset>
      {passwordVerification && (
        <AppAuthMessage>
          비밀번호 양식은 문자와 숫자 8글자 이상입니다.
        </AppAuthMessage>
      )}
    </article>
  );
}
