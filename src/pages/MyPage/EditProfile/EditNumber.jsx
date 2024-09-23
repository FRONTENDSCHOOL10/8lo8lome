import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
import { useMyPageStore } from '@/stores/myPageStore';
import { memo, useState } from 'react';
import { PHONENUMBER_REG } from '@/constant';

function EditNumber() {
  const { checkPhonNumberDuplicate, updateProfile, userData } = useMyPageStore(
    (s) => ({
      checkPhonNumberDuplicate: s.checkPhonNumberDuplicate,
      updateProfile: s.updateProfile,
      userData: s.userData,
    })
  );

  const [phoneNumber, setPhonenumber] = useState(userData.phoneNumber);
  const [isPhoneNumberValid, setisPhoneNumberValid] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [canChange, setCanChange] = useState(false);
  const [isPhonNumberFormatValid, setIsPhonNumberFormatValid] = useState(true);

  const handleChange = (e) => {
    const value = e;
    setPhonenumber(value);
    if (!PHONENUMBER_REG.test(value)) {
      setIsPhonNumberFormatValid(false);
      setisPhoneNumberValid(null);
      setCanChange(false);
    } else {
      setIsPhonNumberFormatValid(true);
      setisPhoneNumberValid(null);
      setCanChange(false);
    }
  };

  const handleCheckAndUpdate = async () => {
    if (!canChange) {
      if (!isPhonNumberFormatValid) {
        return;
      }
      setIsChecking(true);
      setIsUpdating(false);

      const isValid = await checkPhonNumberDuplicate(phoneNumber);
      setisPhoneNumberValid(isValid);

      if (isValid) {
        setCanChange(true); // 닉네임 변경 가능 상태로 설정
      }

      setIsChecking(false);
    } else {
      // 닉네임 변경 로직
      setIsUpdating(true);
      await updateProfile(null, null, null, phoneNumber);
      setIsUpdating(false);
      setCanChange(false); // 닉네임 변경 후 다시 중복 확인 필요하게 설정
      setisPhoneNumberValid(null); // 상태 초기화하여 다시 중복확인 버튼 보이게 함

      // 닉네임 변경 완료 알림
      alert('휴대폰번호가 변경되었습니다!');
    }
  };

  return (
    <article className="p-s20">
      <fieldset className="flex gap-2">
        <legend className="sr-only">닉네임 입력</legend>
        <AppTextInput
          className="min-w-[208px]"
          label="휴대폰 번호"
          placeholder="휴배폰 번호 입력"
          isHiddenLabel
          defaultValue={phoneNumber} // 기본값 유지
          onChange={handleChange}
          required
        />
        <AppButton
          isFilled={false}
          onClick={handleCheckAndUpdate}
          disabled={isChecking || isUpdating || !isPhonNumberFormatValid}
        >
          {isChecking
            ? '확인 중...'
            : isUpdating
              ? '변경 중...'
              : canChange
                ? '변경하기' // 닉네임이 유효할 때만 "변경하기" 버튼 표시
                : '중복확인'}
        </AppButton>
      </fieldset>
      {!isPhonNumberFormatValid && (
        <AppAuthMessage warning> 010 양식 11자리입니다.</AppAuthMessage>
      )}
      {isPhoneNumberValid === false && (
        <AppAuthMessage warning>이미 사용 중인 번호입니다.</AppAuthMessage>
      )}
      {isPhoneNumberValid === true && (
        <AppAuthMessage success>사용 가능한 번호입니다.</AppAuthMessage>
      )}
    </article>
  );
}
export default memo(EditNumber);
