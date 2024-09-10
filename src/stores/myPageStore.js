import { create } from 'zustand';
import { produce } from 'immer';
import pb from '@/api/pb'; // PocketBase 인스턴스
import getPbImageURL from '@/utils/getPbImageURL'; // 이미지 URL 생성 함수

// Zustand 스토어 정의
export const useUserStore = create((set) => ({
  userData: {
    id: '',
    nickName: '',
    email: '',
    profileImage: '',
  },
  setUserData: (newData) =>
    set(
      produce((state) => {
        state.userData = { ...state.userData, ...newData };
      })
    ),

  // 유저 데이터를 포켓베이스에서 가져오는 함수
  fetchUserData: async () => {
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
  },

  // 프로필 업데이트 (이미지, 이메일, 닉네임 모두)
  updateProfile: async (profileImageFile, newNickname, newEmail) => {
    const authData = pb.authStore.model;

    if (authData) {
      try {
        const formData = new FormData();

        // 이미지 파일이 있을 경우에만 추가
        if (profileImageFile) {
          formData.append('photo', profileImageFile);
        }

        // 닉네임과 이메일도 업데이트
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
  },
}));
