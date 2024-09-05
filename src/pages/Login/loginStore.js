import { create } from 'zustand';
import { produce } from 'immer';
import pb from '@/api/pb';

import { setStorageData } from '@/utils/web-storage';

export const useLoginStore = create((set) => {
  const INITIAL_STATE = {
    autoLogin: false,
    emailVerification: false,
    passwordVerification: false,
    userData: [],
    userInput: { email: '', password: '' },
  };

  const setUserField = (field, value) =>
    set(
      produce((draft) => {
        draft.userInput[field] = value;
      })
    );

  const activateAuthMessage = (field) => {
    set(
      produce((draft) => {
        draft[field] = true;
      })
    );
  };

  const deactivateAuthMessage = (field) => {
    set(
      produce((draft) => {
        draft[field] = false;
      })
    );
  };

  const handleEmailChange = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setUserField('email', value);
      deactivateAuthMessage('emailVerification');
    } else {
      activateAuthMessage('emailVerification');
    }
  };

  const handlePasswordChange = (value) => {
    setUserField('password', value);
  };

  const handleAutoLoginCheck = () => {
    set(
      produce((draft) => {
        draft.autoLogin = !draft.autoLogin;
      })
    );
  };

  // PocketBase SDK로 사용자 데이터를 가져오는 함수
  const fetchUserData = async () => {
    try {
      const userData = await pb.collection('users').getFullList(); // 모든 사용자 데이터 가져오기
      set(
        produce((draft) => {
          draft.userData = userData; // 상태에 사용자 데이터 저장
        })
      );
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
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
    fetchUserData,
    handleLoginButtonClick,
  };
});
