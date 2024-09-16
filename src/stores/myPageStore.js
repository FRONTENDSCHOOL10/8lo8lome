import { create } from 'zustand';
import { produce } from 'immer';
import pb from '@/api/pb';
import getPbImageURL from '@/utils/getPbImageURL';

export const useMyPageStore = create((set) => {
  const INITIAL_STATE = {
    userData: {
      id: pb.authStore.model?.id || '',
      nickName: '',
      email: '',
      profileImage: '',
    },
    isLogin: pb.authStore.isValid,
    isNicknameDisabled: true,
    isNickname: null,
  };

  // 상태를 설정하는 함수
  const setUserData = (newData) => {
    set(
      produce((state) => {
        state.userData = { ...state.userData, ...newData };
      })
    );
  };

  // 사용자 데이터를 가져오는 함수
  const fetchUserData = async () => {
    const authData = pb.authStore.model;
    if (authData) {
      const userProfileData = {
        id: authData.id,
        nickname: authData.nickName,
        email: authData.email,
        profileImage: getPbImageURL(authData),
      };
      set(
        produce((state) => {
          state.userData = { ...state.userData, ...userProfileData };
        })
      );
    }
  };

  // 프로필을 업데이트하는 함수
  const updateProfile = async (profileImageFile, newNickname, newEmail) => {
    const authData = pb.authStore.model;

    if (authData) {
      try {
        const formData = new FormData();

        // 이미지 파일이 있을 경우에만 추가
        if (profileImageFile) {
          formData.append('photo', profileImageFile);
        }

        formData.append('nickname', newNickname || authData.nickName);
        formData.append('email', newEmail || authData.email);

        const updatedRecord = await pb
          .collection('item')
          .update(authData.id, formData);

        set(
          produce((state) => {
            state.userData = {
              ...state.userData,
              nickname: updatedRecord.nickName,
              email: updatedRecord.email,
              profileImage: getPbImageURL(
                updatedRecord.id,
                updatedRecord.photo
              ),
            };
          })
        );
        console.log('프로필이 성공적으로 변경되었습니다.');
      } catch (error) {
        console.error('프로필 변경에 실패 하였습니다.:', error);
      }
    }
  };

  return {
    ...INITIAL_STATE,
    setUserData,
    fetchUserData,
    updateProfile,
  };
});
