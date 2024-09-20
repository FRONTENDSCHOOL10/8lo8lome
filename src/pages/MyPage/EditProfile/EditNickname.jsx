import { memo, useState } from 'react';
import { useMyPageStore } from '@/stores/myPageStore';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';

function EditNickname() {
  const { checkNicknameDuplicate, updateProfile, userData } = useMyPageStore(
    (s) => ({
      checkNicknameDuplicate: s.checkNicknameDuplicate,
      updateProfile: s.updateProfile,
      userData: s.userData,
    })
  );

  const [nickname, setNickname] = useState(userData.nickName);
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // 닉네임 업데이트 중인지 상태 추가

  const handleChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameValid(null); // 입력이 변경될 때 상태 초기화
  };

  const handleCheckAndUpdate = async () => {
    setIsChecking(true);
    setIsUpdating(false);

    // 닉네임 중복 확인
    const isValid = await checkNicknameDuplicate(nickname);
    setIsNicknameValid(isValid);

    // 중복되지 않으면 닉네임을 업데이트
    if (isValid) {
      setIsUpdating(true);
      await updateProfile(null, nickname, null);
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
          defaultValue={nickname}
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
