import { create } from 'zustand';
import { produce } from 'immer';
import { EMAIL_REG, PASSWORD_REG } from '@/constant';
import PocketBase from 'pocketbase';

// PocketBase 인스턴스 생성
const pb = new PocketBase('https://eightloeightlome.pockethost.io');

export const useFindPasswordStore = create((set) => {
  const INITIAL_STATE = {
    emailVerification: false,
    passwordVerification: false,
    isVerificationCodeButtonDisabled: true,
    isNewPasswordInput: false,
    isEmailExists: false,
    verificationCode: null,
    userData: {
      email: '',
      newPassword: '',
      id: '',
      oldPassword: '',
      passwordConfirm: '',
    },
    resetStatus: '', // 비밀번호 재설정 상태 추가
  };

  const handleEmailCheck = async () => {
    const email = useFindPasswordStore.getState().userData.email;

    try {
      // 'users' 컬렉션에서 모든 사용자 정보를 가져옴
      const users = await pb.collection('users').getFullList();
      console.log(users);
      // 이메일과 일치하는 사용자 찾기
      const data = users.find((item) => item.email === email);

      set(
        produce((draft) => {
          if (data) {
            draft.isNewPasswordInput = true; // 인증 코드 입력 필드 활성화
            draft.isEmailExists = true;
            draft.userData.id = data.id; // 사용자의 ID 값을 저장
          } else {
            draft.isNewPasswordInput = false;
            draft.isEmailExists = false;
          }
        })
      );
    } catch (error) {
      console.error('이메일 확인 중 오류가 발생했습니다:', error.message);
    }
  };

  const handleEmailChange = (value) => {
    set(
      produce((draft) => {
        if (EMAIL_REG.test(value)) {
          draft.userData.email = value;
          draft.emailVerification = false;
          draft.isVerificationCodeButtonDisabled = false;
        } else {
          draft.userData.email = '';
          draft.emailVerification = true;
          draft.isVerificationCodeButtonDisabled = true;
        }
      })
    );
  };

  const handlePasswordChange = (value) => {
    set(
      produce((draft) => {
        if (PASSWORD_REG.test(value)) {
          draft.passwordVerification = false;
          draft.userData.newPassword = value;
          draft.userData.passwordConfirm = value;
        } else {
          draft.passwordVerification = true;
          draft.userData.newPassword = '';
          draft.userData.passwordConfirm = value;
        }
      })
    );
  };

  const handleOldPasswordChange = (value) => {
    set(
      produce((draft) => {
        draft.userData.oldPassword = value;
      })
    );
  };

  const handlePasswordChangeButtonClick = async () => {
    const { id, newPassword, oldPassword, passwordConfirm } =
      useFindPasswordStore.getState().userData;
    try {
      // 사용자가 로그인 중인 경우 비밀번호 변경을 위해 API 호출
      await pb.collection('users').update(id, {
        password: newPassword,
        oldPassword: oldPassword,
        passwordConfirm: passwordConfirm,
      });

      set(
        produce((draft) => {
          draft.resetStatus = '비밀번호가 성공적으로 변경되었습니다.';
        })
      );
    } catch (error) {
      set(
        produce((draft) => {
          draft.resetStatus =
            '비밀번호 변경 중 오류가 발생했습니다: ' + error.message;
        })
      );
      console.error('비밀번호 변경 중 오류가 발생했습니다:', error.message);
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      await pb.collection('users').requestPasswordReset(email);
    } catch (error) {
      throw new Error(
        '비밀번호 재설정 요청 중 오류가 발생했습니다: ' + error.message
      );
    }
  };

  const confirmPasswordReset = async (token, newPassword) => {
    console.log('Token:', token);
    console.log('New Password:', newPassword);
    try {
      // 서버에서 비밀번호 확인도 필요할 수 있습니다.
      await pb.collection('users').confirmPasswordReset(token, {
        password: newPassword,
        passwordConfirm: newPassword, // 비밀번호 확인이 필요한 경우
      });
      console.log('비밀번호 정상 변경 완료!!');
    } catch (error) {
      throw new Error(
        '비밀번호 재설정 중 오류가 발생했습니다: ' + error.message
      );
    }
  };

  const handlePasswordResetRequest = async () => {
    const email = useFindPasswordStore.getState().userData.email;
    try {
      await requestPasswordReset(email);
      set(
        produce((draft) => {
          draft.resetStatus = '비밀번호 재설정을 위한 이메일이 발송되었습니다.';
        })
      );
    } catch (error) {
      set(
        produce((draft) => {
          draft.resetStatus =
            '비밀번호 재설정 요청 중 오류가 발생했습니다: ' + error.message;
        })
      );
      console.error(
        '비밀번호 재설정 요청 중 오류가 발생했습니다:',
        error.message
      );
    }
  };

  const handlePasswordResetConfirmation = async (token, newPassword) => {
    console.log('Token:', token);
    console.log('New Password:', newPassword);
    try {
      await confirmPasswordReset(token, newPassword);
      console.log('비밀번호 변경 완료!!');
      set(
        produce((draft) => {
          draft.resetStatus = '비밀번호가 성공적으로 변경되었습니다.';
        })
      );
    } catch (error) {
      set(
        produce((draft) => {
          draft.resetStatus =
            '비밀번호 재설정 중 오류가 발생했습니다: ' + error.message;
        })
      );
      console.error('비밀번호 재설정 중 오류가 발생했습니다:', error.message);
    }
  };

  return {
    ...INITIAL_STATE,
    handleEmailCheck,
    handleEmailChange,
    handlePasswordChange,
    handleOldPasswordChange,
    handlePasswordChangeButtonClick,
    handlePasswordResetRequest,
    handlePasswordResetConfirmation,
  };
});
