import { memo, useState } from 'react';
import { useMyPageStore } from '@/stores/myPageStore';
import { useSignupStore } from '@/stores/signStore';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';

function EditNickname() {
  const { updateProfile, userData, setUserData } = useMyPageStore((s) => ({
    updateProfile: s.updateProfile,
    userData: s.userData,
    setUserData: s.setUserData,
  }));

  const { handleNickNameCheck } = useSignupStore((s) => ({
    handleNickNameCheck: s.handleNickNameCheck,
  }));

  const [nickName, setNickname] = useState(userData.nickName);
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // 닉네임 업데이트 중인지 상태 추가

  const handleChange = (e) => {
    setNickname(e);
    setIsNicknameValid(null); // 입력이 변경될 때 상태 초기화
  };

  const checkNicknameDuplicate = async (nickName) => {
    try {
      // useSignupStore의 handleNickNameCheck를 사용하여 중복 확인
      const isDuplicate = await handleNickNameCheck(nickName);

      setUserData((draft) => {
        draft.isNickname = !isDuplicate; // 중복된 닉네임 여부에 따라 상태 변경
      });

      return !isDuplicate; // 중복 여부에 따라 true/false 반환
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error);
      setUserData((draft) => {
        draft.isNickname = null; // 에러 처리
      });
      return false;
    }
  };

  const handleCheckAndUpdate = async () => {
    setIsChecking(true);
    setIsUpdating(false);

    // 닉네임 중복 확인
    const isValid = await checkNicknameDuplicate(nickName);
    setIsNicknameValid(isValid);

    // 중복되지 않으면 닉네임을 업데이트
    if (isValid) {
      setIsUpdating(true);
      await updateProfile(null, nickName, null);
      setIsUpdating(false);
    }

    setIsChecking(false);
  };

  return (
    <article className="p-s20">
      <fieldset className="flex gap-2">
        <legend className="sr-only">닉네임 입력</legend>
        <AppTextInput
          label="닉네임"
          placeholder="닉네임 입력"
          isHiddenLabel
          defaultValue={nickName}
          onChange={handleChange}
          required
        />
        <AppButton
          isFilled={false}
          onClick={handleCheckAndUpdate}
          disabled={isChecking || isUpdating} // 중복 확인 또는 업데이트 중일 때 버튼 비활성화
        >
          {isChecking
            ? '확인 중...'
            : isUpdating
              ? '변경 중...'
              : isNicknameValid === null
                ? '중복확인'
                : '변경하기'}
        </AppButton>
      </fieldset>
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
