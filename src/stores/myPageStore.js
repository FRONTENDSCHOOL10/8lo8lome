import { create } from 'zustand';
import { produce } from 'immer';
import pb from '@/api/pb';
import { getFirstListItem, updateData } from '@/api/CRUD';
import { getPbImageURL } from '@/utils';
import { NICKNAME_REG, EMAIL_REG } from '@/constant';

export const useMyPageStore = create((set) => {
  const INITIAL_s = {
    userData: {
      id: pb.authStore.model?.id || '',
      nickName: pb.authStore.model?.nickName || '',
      email: pb.authStore.model?.email || '',
      profileImage: '',
    },
    isLogin: pb.authStore.isValid,
    isNicknameDisabled: true,
    isNickname: null,
    isEmailValid: null, // 이메일 유효성 상태
    emailValidationMessage: '',
  };

  // 상태를 설정하는 함수
  const setUserData = (newData) => {
    set(
      produce((s) => {
        s.userData = { ...s.userData, ...newData };
      })
    );
  };

  const checkNicknameDuplicate = async (nickName) => {
    // 유효한 닉네임인지 정규 표현식으로 검사
    if (!NICKNAME_REG.test(nickName)) {
      set(
        produce((s) => {
          s.isNickname = null; // 유효하지 않은 닉네임
        })
      );
      return false;
    }

    try {
      // 닉네임에 해당하는 첫 번째 사용자 항목을 가져옵니다.
      const result = await getFirstListItem('users', 'nickName', nickName);

      // 중복 여부에 따라 상태를 업데이트합니다.
      set(
        produce((s) => {
          s.isNickname = !result; // result가 존재하면 중복된 것이므로 false
        })
      );

      return !result; // 중복 여부에 따라 true/false 반환
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

  const checkEmailDuplicate = async () => {
    const userEmail = useMyPageStore.getState().userData.email; // 사용자 이메일 가져오기

    // 이메일 유효성 검사
    if (!EMAIL_REG.test(userEmail)) {
      set(
        produce((draft) => {
          draft.isEmailValid = '유효하지 않은 이메일 형식입니다.'; // 유효하지 않은 이메일 메시지
        })
      );
      return false;
    }

    try {
      // 이메일 중복 확인
      const emailResult = await getFirstListItem('users', 'email', userEmail);

      // 상태 업데이트
      set(
        produce((draft) => {
          draft.isEmailValid = emailResult
        
          console.log('getFirstListItem result:', emailResult); // 반환된 이메일 결과 확인
        })
      );

      return !!emailResult; // 이메일이 존재하면 true, 존재하지 않으면 false 반환
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);

      set(
        produce((draft) => {
          draft.isEmailValid = '이메일 중복 확인 중 오류가 발생했습니다.'; // 에러 처리 메시지
        })
      );

      return false;
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

        // 닉네임과 이메일을 FormData에 추가
        formData.append('nickName', newNickname || authData.nickName);
        formData.append('email', newEmail || authData.email);

        // 사용자 정보를 PocketBase에서 업데이트
        const updatedRecord = await updateData('users', authData.id, formData);

        if (updatedRecord) {
          set(
            produce((s) => {
              s.userData = {
                ...s.userData,
                nickName: updatedRecord.nickName,
                email: updatedRecord.email,
                profileImage: getPbImageURL(
                  updatedRecord.id,
                  updatedRecord.photo
                ),
              };
            })
          );
          console.log('프로필이 성공적으로 변경되었습니다.');
        }
      } catch (error) {
        console.error('프로필 변경에 실패 하였습니다.:', error);
      }
    }
  };

  return {
    ...INITIAL_s,
    setUserData,
    fetchUserData,
    updateProfile,
    checkNicknameDuplicate,
    checkEmailDuplicate,
  };
});
