import { create } from 'zustand';
import { produce } from 'immer';
import pb from '@/api/pb';
import { removeStorageData } from '@/utils';

export const useLogoutStore = create((set) => {
  const INITIAL_STATE = {
    isLoggedIn: pb.authStore.isValid,
    isLoggedOut: false,
  };

  // 상태 변경을 감지하여 상태를 업데이트합니다.
  pb.authStore.onChange(() => {
    set(
      produce((draft) => {
        draft.isLoggedIn = pb.authStore.isValid;
      })
    );
  });

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const result = confirm('정말로 로그아웃 하시겠습니까?');
    if (result) {
      try {
        pb.authStore.clear();
        removeStorageData('autoLogin');
        set(
          produce((draft) => {
            draft.isLoggedOut = true;
          })
        );
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    }
  };

  const resetLogoutState = () => {
    set(
      produce((draft) => {
        draft.isLoggedOut = false; // 로그아웃 상태를 false로 설정
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleLogout,
    resetLogoutState,
  };
});
