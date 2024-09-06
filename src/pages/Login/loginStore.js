import pb from '@/api/pb';
import { create } from 'zustand';
import { produce } from 'immer';
import { setStorageData } from '@/utils/web-storage';
import { EMAIL_REG } from '@/constant';

export const useLoginStore = create((set) => {
  const INITIAL_STATE = {
    autoLogin: false,
    emailVerification: false,
    passwordVerification: false,
    userData: [],
    userInput: { email: '', password: '' },
  };

  const handleEmailChange = (value) => {
    set(
      produce((draft) => {
        if (EMAIL_REG.test(value)) {
          draft.userInput.email = value;
          draft.emailVerification = false;
        } else {
          draft.emailVerification = true;
        }
      })
    );
  };

  const handlePasswordChange = (value) => {
    set(
      produce((draft) => {
        draft.userInput.password = value;
      })
    );
  };

  const handleAutoLoginCheck = () => {
    set(
      produce((draft) => {
        draft.autoLogin = !draft.autoLogin;
      })
    );
  };

  // PocketBase SDK로 로그인 처리하는 함수
  const handleLoginButtonClick = async () => {
    const { email, password } = useLoginStore.getState().userInput;

    // 이메일과 비밀번호가 입력되었는지 확인
    if (!email || !password) {
      console.error('Email and password are required');
      return;
    }
    try {
      // PocketBase SDK를 사용하여 이메일과 비밀번호로 인증
      const authData = await pb
        .collection('users')
        .authWithPassword(email, password);

      if (authData) {
        // 로그인 성공 시 상태 업데이트
        set(
          produce((draft) => {
            if (draft.autoLogin) {
              setStorageData('autoLogin', true);
            } else {
              setStorageData('autoLogin', false);
            }
          })
        );
        console.log('Login successful');
        return true;
      } else {
        console.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };
  return {
    ...INITIAL_STATE,
    handleEmailChange,
    handlePasswordChange,
    handleAutoLoginCheck,
    handleLoginButtonClick,
  };
});
