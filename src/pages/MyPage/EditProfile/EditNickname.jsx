import { memo } from 'react';
import { useSignupStore } from '@/stores/signStore';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';

function EditNickname() {
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
    <article className="p-s20">
      <fieldset className="flex gap-2 ">
        <legend className="sr-only">닉네임 입력</legend>
        <AppTextInput
          label="닉네임"
          placeholder="닉네임 입력"
          isHiddenLabel
          onChange={handleNickNameChange}
          required
        />
        <AppButton
          isFilled={false}
          disabled={isNickNameButtonDisabled}
          onClick={handleNickNameCheck}
        >
          중복확인
        </AppButton>
      </fieldset>
      <AppAuthMessage warning={warning}>{message}</AppAuthMessage>
    </article>
  );
}

export default memo(EditNickname);
