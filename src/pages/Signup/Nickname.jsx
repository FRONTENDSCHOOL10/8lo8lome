import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
import { useSignupStore } from '@/stores/signStore';
import { memo } from 'react';

function Nickname() {
  const {
    handleNickNameChange,
    handleNickNameCheck,
    isNickNameExists,
    isNickNameButtonDisabled,
  } = useSignupStore((s) => ({
    handleNickNameChange: s.handleMethod.handleNickNameChange,
    handleNickNameCheck: s.handleMethod.handleNickNameCheck,
    isNickNameExists: s.authMessages.isNickNameExists,
    isNickNameButtonDisabled: s.nickNameValidation.isNickNameButtonDisabled,
  }));

  const isNickNameExist = {
    warning: isNickNameExists == '이미 존재하는 닉네임입니다.' ? true : false,
    message: isNickNameExists,
  };

  const { warning, message } = isNickNameExist;

  return (
    <>
      <article>
        <h2 className="sr-only">닉네임 입력</h2>
        <fieldset className="flex gap-2">
          <AppTextInput
            label="닉네임"
            placeholder="닉네임"
            isHiddenLabel
            className="min-w-[200px]"
            onChange={handleNickNameChange}
            required
          />
          <AppButton
            isFilled={false}
            onClick={handleNickNameCheck}
            disabled={isNickNameButtonDisabled}
          >
            중복확인
          </AppButton>
        </fieldset>
        <AppAuthMessage warning={warning}>{message}</AppAuthMessage>
      </article>
    </>
  );
}

export default memo(Nickname);
