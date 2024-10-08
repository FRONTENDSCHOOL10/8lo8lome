import { AppAuthMessage, AppButton, AppEmailInput } from '@/components';
import { useSignupStore } from '@/stores/signStore';
import { memo } from 'react';

function Email() {
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
      <fieldset className="flex gap-2">
        <legend className="sr-only">이메일 입력</legend>
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
      <AppAuthMessage warning={warning}>{message}</AppAuthMessage>
    </article>
  );
}

export default memo(Email);
