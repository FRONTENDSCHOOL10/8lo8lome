import { AppAuthMessage, AppButton, AppInput } from '@/components';
import { useSignupStore } from './store';

export function Email() {
  const { handleEmailChange, emailVerification } = useSignupStore((s) => ({
    handleEmailChange: s.handleMethod.handleEmailChange,
    emailVerification: s.authMessages.emailVerification,
  }));

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
          autocomplete="email"
          required
        />
        <AppButton isFilled={false}>중복확인</AppButton>
      </fieldset>
      {emailVerification && (
        <AppAuthMessage>이메일 양식이 맞지 않습니다.</AppAuthMessage>
      )}
    </article>
  );
}
