import { AppAuthMessage, AppButton, AppEmailInput } from '@/components';
import { useSignupStore } from './store';

export function Email() {
  const { handleEmailChange, handleEmailCheck, emailValidation } =
    useSignupStore((s) => ({
      handleEmailChange: s.handleMethod.handleEmailChange,
      handleEmailCheck: s.handleMethod.handleEmailCheck,
      emailValidation: s.emailValidation,
    }));

  const { isEmailButtonDisabled, message } = emailValidation;

  const warning =
    message.includes('유효한 이메일') || message.includes('이미 가입');

  return (
    <article>
      <h2 className="sr-only">이메일 입력</h2>
      <fieldset className="flex gap-2">
        <AppEmailInput
          label="이메일"
          placeholder="이메일"
          isHiddenLabel
          className="min-w-[200px]"
          onChange={handleEmailChange}
          required
        />
        <AppButton
          isFilled={false}
          onClick={handleEmailCheck}
          disabled={isEmailButtonDisabled}
        >
          중복확인
        </AppButton>
      </fieldset>
      {message && <AppAuthMessage warning={warning}>{message}</AppAuthMessage>}
    </article>
  );
}
