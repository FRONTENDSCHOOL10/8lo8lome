import { AppAuthMessage, AppButton, AppInput } from '@/components';
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
        <AppInput
          label="이메일"
          placeholder="이메일"
          email
          isHiddenLabel
          className="min-w-[200px]"
          onChange={handleEmailChange}
          required
        />
        <AppButton
          isFilled={false}
          onClick={handleEmailCheck}
          disabled={isEmailButtonDisabled} // 유효한 이메일 형식일 때만 버튼 활성화
        >
          중복확인
        </AppButton>
      </fieldset>

      {/* 단일 AppAuthMessage 사용 */}
      {message && <AppAuthMessage warning={warning}>{message}</AppAuthMessage>}
    </article>
  );
}
