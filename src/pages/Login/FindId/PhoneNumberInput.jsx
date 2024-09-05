import { AppTextInput, AppButton, AppAuthMessage } from '@/components';
import { memo } from 'react';
import { useFindStore } from './findStore';

function PhoneNumberInput() {
  const {
    handlePhoneNumberChange,
    phoneNumberVerification,
    isVerificationCodeButtonDisabled,
    handlePhoneNumberCheck,
  } = useFindStore((s) => ({
    handlePhoneNumberChange: s.handlePhoneNumberChange,
    phoneNumberVerification: s.phoneNumberVerification,
    isVerificationCodeButtonDisabled: s.isVerificationCodeButtonDisabled,
    handlePhoneNumberCheck: s.handlePhoneNumberCheck,
  }));

  return (
    <div className="flex flex-col">
      <article className="flex gap-3">
        <AppTextInput
          label="전화번호"
          placeholder="전화번호"
          isHiddenLabel
          className="min-w-[200px]"
          onChange={handlePhoneNumberChange}
        />
        <AppButton
          isFilled={false}
          disabled={isVerificationCodeButtonDisabled}
          onClick={handlePhoneNumberCheck}
        >
          인증요청
        </AppButton>
      </article>
      {phoneNumberVerification && (
        <AppAuthMessage warning>전화번호 양식이 맞지 않습니다.</AppAuthMessage>
      )}
    </div>
  );
}

export default memo(PhoneNumberInput);
