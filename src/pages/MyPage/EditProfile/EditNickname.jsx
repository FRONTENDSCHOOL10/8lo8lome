import { memo } from 'react';
import { useMyPageStore } from '@/stores/myPageStore';
import { AppButton, AppTextInput, AppAuthMessage } from '@/components';
import toast from 'react-hot-toast';
function EditNickname() {
  const { getNickName, isNicknameDisabled, checkNickname } = useMyPageStore(
    (s) => ({
      getNickName: s.getNickName,
      isNicknameDisabled: s.isNicknameDisabled,
      checkNickname: s.checkNickname,
    })
  );

  const isShow = isNicknameDisabled ? 'hidden' : 'block';

  const handleNicknameButtonClick = async () => {
    try {
      const result = await checkNickname();
      if (result === true) {
        toast.custom(
          () => (
            <div
              className="w-w$16 h-h$102 bg-subBg border border-solid border-white px-4 py-4 rounded"
              role="alert"
            >
              <svg
                className="text-mainColor p-1 mx-auto mb-5 w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <use href="/assets/sprite.svg#checkmark-circle-click" />
              </svg>
              <p className="font-bold text-white text-f14">
                변경 가능한 닉네임 입니다!
              </p>
            </div>
          ),
          {
            duration: 2000,
          }
        );
      } else if (result === false) {
        toast.custom(
          () => (
            <div
              className="w-w$16 h-h$102 bg-subBg border border-solid border-white px-4 py-4 rounded"
              role="alert"
            >
              <svg
                className="text-red-500 p-1 mx-auto mb-5 w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <use href="/assets/sprite.svg#warning" />
              </svg>
              <p className="font-bold text-white text-f14">
                이미 사용중인 닉네임 입니다!
              </p>
            </div>
          ),
          {
            duration: 2000,
          }
        );
      } else {
        console.error('Unexpected result from checkNickname');
      }
    } catch (error) {
      console.error('Error checking nickname:', error);
      toast.error('닉네임 확인 중 오류가 발생했습니다.', {
        style: {
          borderRadius: '5px',
          background: 'black',
          color: '#fff',
        },
        duration: 2000,
      });
    }
  };

  return (
    <>
      <article className="px-s20">
        <fieldset className="flex gap-2 ">
          <legend className="sr-only">닉네임 입력</legend>
          <AppTextInput
            label="닉네임"
            className="min-w-[208px]"
            placeholder="닉네임"
            isHiddenLabel
            required
            onChange={getNickName}
          />
          <AppButton
            isFilled={false}
            disabled={!isNicknameDisabled}
            onClick={handleNicknameButtonClick}
          >
            중복확인
          </AppButton>
        </fieldset>
        <AppAuthMessage warning className={isShow}>
          유효한 닉네임을 입력해 주세요.
        </AppAuthMessage>
      </article>
    </>
  );
}
export default memo(EditNickname);
