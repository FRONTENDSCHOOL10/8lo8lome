import { AppTextInput, AppButton } from '@/components';
import { useFindIdStore } from './findIdStore';
import { memo } from 'react';

function VerificationCodeInput() {
  const { handleVerificationCodeChange, handleVerificationCodeCheck } =
    useFindIdStore((s) => ({
      handleVerificationCodeChange: s.handleVerificationCodeChange,
      handleVerificationCodeCheck: s.handleVerificationCodeCheck,
    }));

  return (
    <div className="flex flex-col">
      <article className="flex gap-3">
        <AppTextInput
          label="인증번호"
          placeholder="인증번호"
          isHiddenLabel
          className="min-w-[200px]"
          onChange={handleVerificationCodeChange}
        />
        <AppButton isFilled={false} onClick={handleVerificationCodeCheck}>
          본인인증
        </AppButton>
      </article>
    </div>
  );
}

export default memo(VerificationCodeInput);
