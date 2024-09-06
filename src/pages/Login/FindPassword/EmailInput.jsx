import { AppButton, AppAuthMessage, AppEmailInput } from '@/components';
import { memo } from 'react';
import { useFindPasswordStore } from '@/stores/findPasswordStore';
import toast from 'react-hot-toast';

function PhoneNumberInput() {
  const {
    handleEmailCheck,
    handleEmailChange,
    emailVerification,
    isVerificationCodeButtonDisabled,
  } = useFindPasswordStore((s) => ({
    handleEmailCheck: s.handleEmailCheck,
    handleEmailChange: s.handleEmailChange,
    emailVerification: s.emailVerification,
    isVerificationCodeButtonDisabled: s.isVerificationCodeButtonDisabled,
  }));

  const handleButtonClick = async () => {
    await handleEmailCheck();
    const { isEmailExists } = useFindPasswordStore.getState();
    if (!isEmailExists) {
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
              일치하는 아이디가 없습니다.
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
    <div className="flex flex-col">
      <article className="flex gap-3">
        <AppEmailInput
          label="이메일"
          placeholder="이메일"
          isHiddenLabel
          className="min-w-[200px]"
          onChange={handleEmailChange}
        />
        <AppButton
          isFilled={false}
          disabled={isVerificationCodeButtonDisabled}
          onClick={handleButtonClick}
        >
          인증요청
        </AppButton>
      </article>
      {emailVerification && (
        <AppAuthMessage warning>이메일 양식이 맞지 않습니다.</AppAuthMessage>
      )}
    </div>
  );
}

export default memo(PhoneNumberInput);
