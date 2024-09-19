import { AppButton, AppTextInput } from '@/components';
import { useSignupStore } from '@/stores/signStore';
import toast from 'react-hot-toast';
import { memo } from 'react';

function PhoneNumber() {
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

  const handleVerificationButtonClick = async () => {
    await handlePhoneNumberCheck(); // 전화번호 검증을 기다립니다.

    const { isNumberExists, verificationCode } =
      useSignupStore.getState().phoneNumberValidation;

    if (isNumberExists) {
      toast.custom(
        () => (
          <div
            className="w-w$16 h-h$102 bg-subBg border border-solid border-white px-4 py-4 rounded"
            role="alert"
          >
            <svg
              className="text-red-500 p-1 mx-auto mb-5 w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <use href="/assets/sprite.svg#warning" />
            </svg>
            <p className="font-bold text-white text-f14">
              이미 존재하는 번호입니다!
            </p>
          </div>
        ),
        {
          duration: 2000,
        }
      );
    } else {
      toast.custom(
        () => (
          <div
            className="w-w$16 h-h$102 bg-subBg border border-solid border-white px-4 py-4 rounded"
            role="alert"
          >
            <svg
              className="text-mainColor p-1 mx-auto mb-5 w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <use href="/assets/sprite.svg#warning" />
            </svg>
            <p className="font-bold text-white text-f14">
              인증번호: {verificationCode}
            </p>
          </div>
        ),
        {
          duration: 2000,
        }
      );
    }
  };

  return (
    <article>
      <fieldset className="flex gap-2">
        <legend className="sr-only">전화번호 입력</legend>
        <AppTextInput
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
          onClick={handleVerificationButtonClick}
          disabled={isVerificationCodeButtonDisabled}
        >
          인증받기
        </AppButton>
      </fieldset>
      {isVerificationCodeInput && (
        <AppTextInput
          label="인증번호"
          placeholder="인증번호"
          isHiddenLabel
          className={'w-full mt-s20'}
          onChange={handleVerificationCodeCheck}
        />
      )}
    </article>
  );
}

export default memo(PhoneNumber);
