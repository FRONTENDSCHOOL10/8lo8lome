import { AppButton, AppInput } from '@/components';
import { useSignupStore } from './store';

export function PhoneNumber() {
  const {
    handlePhoneNumberChange,
    handlePhoneNumberCheck,
    handleVerificationCodeCheck,
    phoneNumberValidation,
  } = useSignupStore((s) => ({
    handlePhoneNumberChange: s.handleMethod.handlePhoneNumberChange,
    handlePhoneNumberCheck: s.handleMethod.handlePhoneNumberCheck,
    handleVerificationCodeCheck: s.handleMethod.handleVerificationCodeCheck,
    phoneNumberValidation: s.phoneNumberValidation,
  }));

  const { isVerificationCodeInput, isVerificationCodeButtonDisabled } =
    phoneNumberValidation;

  return (
    <article>
      <h2 className="sr-only">전화번호 입력</h2>
      <fieldset className="flex gap-2">
        <AppInput
          label="전화번호"
          placeholder="전화번호"
          isHiddenLabel
          className="min-w-[200px]"
          onChange={handlePhoneNumberChange}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          required
        />
        <AppButton
          isFilled={false}
          onClick={handlePhoneNumberCheck}
          disabled={isVerificationCodeButtonDisabled}
        >
          인증받기
        </AppButton>
      </fieldset>
      {isVerificationCodeInput && (
        <AppInput
          label="인증번호"
          placeholder="인증번호"
          isHiddenLabel
          className={'w-full mt-5'}
          onChange={handleVerificationCodeCheck}
        />
      )}
    </article>
  );
}
