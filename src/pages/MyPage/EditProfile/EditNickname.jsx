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

  const [nickName, setNickname] = useState(userData.nickName);
  const [isNicknameValid, setIsNicknameValid] = useState(null); // 중복확인 결과 저장
  const [isChecking, setIsChecking] = useState(false); // 중복확인 중인지 여부
  const [isUpdating, setIsUpdating] = useState(false); // 닉네임 업데이트 중인지 여부
  const [canChange, setCanChange] = useState(false); // 닉네임이 업데이트 가능한 상태인지 여부

  const handleChange = (e) => {
    setNickname(e);
    setIsNicknameValid(null); // 입력이 변경될 때 상태 초기화
    setCanChange(false); // 닉네임이 다시 입력되면 변경 가능 상태를 초기화
  };

  const handleCheckAndUpdate = async () => {
    if (!canChange) {
      // 중복 확인 로직
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
      await updateProfile(null, nickName, null);
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
          disabled={isChecking || isUpdating}
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
