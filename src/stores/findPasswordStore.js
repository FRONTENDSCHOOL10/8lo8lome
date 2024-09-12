import { create } from 'zustand';
import { produce } from 'immer';
import { EMAIL_REG, PASSWORD_REG } from '@/constant';
import pb from '@/api/pb';
import { updateData } from '@/api/CRUD';
import { removeStorageData } from '@/utils';

export const useFindPasswordStore = create((set) => {
  const INITIAL_STATE = {
    emailVerification: false,
    oldPasswordVerification: false,
    newPasswordVerification: false,
    newPasswordConfirmVerification: false,
    isVerificationCodeButtonDisabled: true,
    isNewPasswordInput: false,
    isEmailExists: false,
    verificationCode: null,
    isLogin: pb.authStore.isValid,
    userData: {
      id: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    isChangePassword: null,
  };

  const handleEmailCheck = async () => {
    const email = useFindPasswordStore.getState().userData.email;
    const user = pb.authStore.model;
    try {
      set(
        produce((draft) => {
          if (email === user.email) {
            draft.isNewPasswordInput = true; // 인증 코드 입력 필드 활성화
            draft.isEmailExists = true;
            draft.userData.id = user.id; // 사용자의 ID 값을 저장
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

  const handleOldPasswordChange = (value) => {
    set(
      produce((draft) => {
        if (PASSWORD_REG.test(value)) {
          draft.oldPasswordVerification = false;
          draft.userData.oldPassword = value;
        } else {
          draft.oldPasswordVerification = true;
          draft.userData.oldPassword = '';
        }
      })
    );
  };

  const handleNewPasswordChange = (value) => {
    set(
      produce((draft) => {
        if (PASSWORD_REG.test(value)) {
          draft.newPasswordVerification = false;
          draft.userData.newPassword = value;
        } else {
          draft.newPasswordVerification = true;
          draft.userData.newPassword = '';
        }
      })
    );
  };

  const handleNewPasswordConfirmChange = (value) => {
    const { newPassword } = useFindPasswordStore.getState().userData;
    set(
      produce((draft) => {
        if (PASSWORD_REG.test(value) && newPassword === value) {
          draft.newPasswordConfirmVerification = false;
          draft.userData.newPasswordConfirm = value;
        } else {
          draft.newPasswordConfirmVerification = true;
          draft.userData.newPasswordConfirm = '';
        }
      })
    );
  };

  const handlePasswordChangeButtonClick = async () => {
    const { id, newPassword, oldPassword, newPasswordConfirm } =
      useFindPasswordStore.getState().userData;
    const isLogin = useFindPasswordStore.getState().isLogin;

    if (!isLogin) {
      console.error('사용자가 로그인되어 있지 않습니다.');
      return;
    }

    // 비밀번호 변경 요청
    try {
      await pb.authStore.authWithPassword(
        pb.authStore.model.email,
        oldPassword
      );
      await updateData('users', id, {
        password: newPassword,
        oldPassword: oldPassword,
        passwordConfirm: newPasswordConfirm,
      });

      // 인증 토큰을 새로고침하고 저장된 데이터를 삭제
      pb.authStore.clear();
      removeStorageData('autoLogin');

      set(
        produce((draft) => {
          draft.isChangePassword = true;
        })
      );
    } catch (error) {
      set(
        produce((draft) => {
          draft.isChangePassword = false;
        })
      );
    }
  };

  return {
    ...INITIAL_STATE,
    handleEmailCheck,
    handleEmailChange,
    handleOldPasswordChange,
    handleNewPasswordConfirmChange,
    handleNewPasswordChange,
    handlePasswordChangeButtonClick,
  };
});
