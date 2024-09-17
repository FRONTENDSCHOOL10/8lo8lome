import { create } from 'zustand';
import { produce } from 'immer';
import pb from '@/api/pb';
import { getData } from '@/api/CRUD';
import getPbImageURL from '@/utils/getPbImageURL';
import { getPbImageURL } from '@/utils';

export const useMyPageStore = create((set) => {
  const INITIAL_s = {
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
      produce((s) => {
        s.userData = { ...s.userData, ...newData };
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
        produce((s) => {
          s.userData = { ...s.userData, ...userProfileData };
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
          produce((s) => {
            s.userData = {
              ...s.userData,
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

  const checkNicknameDuplicate = async (nickname) => {
    try {
      const response = await getData('users', {
        filter: `nickName="${nickname}"`,
      });
      if (response.items.length > 0) {
        set(
          produce((s) => {
            s.isNickname = false; // 중복된 닉네임
          })
        );
        return false;
      } else {
        set(
          produce((s) => {
            s.isNickname = true; // 중복되지 않음
          })
        );
        return true;
      }
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error);
      set(
        produce((s) => {
          s.isNickname = null; // 에러 처리
        })
      );
      return false;
    }
  };

  const updateNickname = async (newNickname) => {
    const authData = pb.authStore.model;
    if (authData) {
      try {
        const updatedRecord = await pb.collection('users').update(authData.id, {
          nickName: newNickname,
        });

        // 상태 업데이트
        set(
          produce((s) => {
            s.userData.nickName = updatedRecord.nickName;
          })
        );

        console.log('닉네임이 성공적으로 업데이트되었습니다.');
      } catch (error) {
        console.error('닉네임 업데이트 실패:', error);
      }
    }
  };

  return {
    ...INITIAL_s,
    setUserData,
    fetchUserData,
    updateProfile,
    checkNicknameDuplicate,
    updateNickname,
  };
});
