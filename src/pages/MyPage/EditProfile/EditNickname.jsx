import { memo, useState } from 'react';
import { useMyPageStore } from '@/stores/myPageStore';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
import { NICKNAME_REG } from '@/constant'; // NICKNAME_REG를 상수로 불러옴

function EditNickname() {
  const { checkNicknameDuplicate, updateProfile, userData } = useMyPageStore(
    (s) => ({
      checkNicknameDuplicate: s.checkNicknameDuplicate,
      updateProfile: s.updateProfile,
      userData: s.userData,
    })
  );

  const [nickName, setNickname] = useState(userData.nickName);
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [canChange, setCanChange] = useState(false);
  const [isNicknameFormatValid, setIsNicknameFormatValid] = useState(true);

  // 닉네임 입력 변경 핸들러
  const handleChange = (e) => {
    const value = e;
    setNickname(value);

    // 닉네임 형식 검사
    if (!NICKNAME_REG.test(value)) {
      setIsNicknameFormatValid(false); // 닉네임 형식이 유효하지 않음
      setIsNicknameValid(null); // 중복확인 결과도 초기화
      setCanChange(false); // 닉네임 변경 가능 상태 초기화
    } else {
      setIsNicknameFormatValid(true); // 닉네임 형식이 유효함
      setIsNicknameValid(null); // 입력이 변경될 때 중복확인 결과 초기화
      setCanChange(false); // 닉네임 변경 가능 상태 초기화
    }
  };

  // 닉네임 중복 확인 및 업데이트
  const handleCheckAndUpdate = async () => {
    if (!canChange) {
      if (!isNicknameFormatValid) {
        // 닉네임 형식이 유효하지 않으면 중복 확인을 하지 않음
        return;
      }
      setIsChecking(true);
      setIsUpdating(false);

      const isValid = await checkNicknameDuplicate(nickName);
      setIsNicknameValid(isValid);

      if (isValid) {
        setCanChange(true); // 닉네임 변경 가능 상태로 설정
      }

      setIsChecking(false);
    } else {
      // 닉네임 변경 로직
      setIsUpdating(true);
      await updateProfile(null, nickName, null, null);
      setIsUpdating(false);
      setCanChange(false); // 닉네임 변경 후 다시 중복 확인 필요하게 설정
      setIsNicknameValid(null); // 상태 초기화하여 다시 중복확인 버튼 보이게 함

      // 닉네임 변경 완료 알림
      alert('닉네임이 변경되었습니다!');
    }
  };

  return (
    <article className="p-s20">
      <fieldset className="flex gap-2">
        <legend className="sr-only">닉네임 입력</legend>
        <AppTextInput
          className="min-w-[208px]"
          label="닉네임"
          placeholder="닉네임 입력"
          isHiddenLabel
          defaultValue={nickName} // 기본값 유지
          onChange={handleChange}
          required
        />
        <AppButton
          isFilled={false}
          onClick={handleCheckAndUpdate}
          disabled={isChecking || isUpdating || !isNicknameFormatValid}
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

      {!isNicknameFormatValid && (
        <AppAuthMessage warning>
          닉네임은 2~10자의 영어, 숫자, 또는 한글만 가능합니다.
        </AppAuthMessage>
      )}

      {isNicknameValid === false && (
        <AppAuthMessage warning>이미 사용 중인 닉네임입니다.</AppAuthMessage>
      )}

      {isNicknameValid === true && (
        <AppAuthMessage success>사용 가능한 닉네임입니다.</AppAuthMessage>
      )}
    </article>
  );
}

export default memo(EditNickname);
