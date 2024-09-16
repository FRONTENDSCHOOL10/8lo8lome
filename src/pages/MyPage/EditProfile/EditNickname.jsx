import { memo, useState } from 'react';
import { useMyPageStore } from '@/stores/myPageStore';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';

function EditNickname() {
  const { checkNicknameDuplicate, updateNickname, userData } = useMyPageStore(
    (state) => ({
      checkNicknameDuplicate: state.checkNicknameDuplicate,
      updateNickname: state.updateNickname,
      userData: state.userData,
    })
  );

  const [nickname, setNickname] = useState(userData.nickName);
  const [isNicknameValid, setIsNicknameValid] = useState(null);

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleCheck = async () => {
    const isValid = await checkNicknameDuplicate(nickname);
    setIsNicknameValid(isValid);
  };

  const handleUpdate = async () => {
    if (isNicknameValid) {
      await updateNickname(nickname); // 닉네임 업데이트 호출
    }
  };

  return (
    <article className="p-s20">
      <fieldset className="flex gap-2">
        <legend className="sr-only">닉네임 입력</legend>
        <AppTextInput
          label="닉네임"
          placeholder="닉네임 입력"
          isHiddenLabel
          // value={nickname} // Controlled input: value를 상태로 관리
          onChange={handleChange}
          required
        />
        <AppButton isFilled={false} onClick={handleCheck}>
          중복확인
        </AppButton>
      </fieldset>
      {isNicknameValid === false && (
        <AppAuthMessage warning>이미 사용 중인 닉네임입니다.</AppAuthMessage>
      )}
      {isNicknameValid === true && (
        <AppAuthMessage success>사용 가능한 닉네임입니다.</AppAuthMessage>
      )}
      {/* <AppButton
        isFilled={true}
        onClick={handleUpdate}
        disabled={!isNicknameValid}
      >
        닉네임 변경
      </AppButton> */}
    </article>
  );
}

export default memo(EditNickname);
