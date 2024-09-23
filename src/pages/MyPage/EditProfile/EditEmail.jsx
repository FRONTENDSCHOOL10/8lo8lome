import { useState, memo } from 'react';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
import { useMyPageStore } from '@/stores/myPageStore';
import { EMAIL_REG } from '@/constant';

function EditEmail() {
  const { checkEmailDuplicate, updateProfile, userData } = useMyPageStore(
    (s) => ({
      checkEmailDuplicate: s.checkEmailDuplicate,
      updateProfile: s.updateProfile,
      userData: s.userData,
    })
  );

  const [email, setEmail] = useState(userData.email);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [canChange, setCanChange] = useState(false);
  const [isEmailFormatValid, setIsEmailFormatValid] = useState(true);
  const handleChange = (e) => {
    const value = e;
    setEmail(value);
    if (!EMAIL_REG.test(value)) {
      setIsEmailFormatValid(false);
      setIsEmailValid(null);
      setCanChange(false);
    } else {
      setIsEmailFormatValid(true);
      setIsEmailValid(null);
      setCanChange(false);
    }
  };

  const handleCheckAndUpdate = async () => {
    if (!canChange) {
      if (!isEmailFormatValid) {
        return;
      }
      setIsChecking(true);
      setIsUpdating(false);

      const isValid = await checkEmailDuplicate(email);
      setIsEmailValid(isValid);

      if (isValid) {
        setCanChange(true);
      }
      setIsChecking(false);
    } else {
      setIsUpdating(true);
      await updateProfile(null, null, email, null);
      setIsUpdating(false);
      setCanChange(false);
      setIsEmailValid(null);
      alert('이메일이 변경되었습니다!');
    }
  };

  return (
    <article className="px-s20">
      <fieldset className="flex gap-2">
        <legend className="sr-only">이메일 입력</legend>
        <AppTextInput
          label="이메일"
          placeholder="이메일"
          isHiddenLabel
          className="min-w-[208px]"
          defaultValue={email}
          required
          onChange={handleChange} // 입력값 변경 처리
        />
        <AppButton
          isFilled={false}
          onClick={handleCheckAndUpdate}
          disabled={isChecking || isUpdating || !isEmailFormatValid}
        >
          {isChecking
            ? '확인 중...'
            : isUpdating
              ? '변경중...'
              : canChange
                ? '변경하기'
                : '중복확인'}
        </AppButton>
      </fieldset>
      {!isEmailFormatValid && (
        <AppAuthMessage warning>
          이메일은 2~10자의 영어, 숫자 와 @가 포함돼야 합니다.
        </AppAuthMessage>
      )}
      {isEmailValid === false && (
        <AppAuthMessage warning>이미 사용 중인 이메일입니다.</AppAuthMessage>
      )}
      {isEmailValid === true && (
        <AppAuthMessage success>사용 가능한 이메일입니다.</AppAuthMessage>
      )}
    </article>
  );
}

export default memo(EditEmail);
