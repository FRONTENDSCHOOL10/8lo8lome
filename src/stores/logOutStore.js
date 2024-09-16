import { create } from 'zustand';
import { produce } from 'immer';
import { getData } from '@/api/CRUD';
import pb from '@/api/pb';
import { removeStorageData } from '@/utils';

export const useLogoutStore = create((set) => {
  const INITIAL_STATE = {
    isLoggedOut: false,
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const result = confirm('정말로 로그아웃 하시겠습니까?');

    if (result) {
      try {
        const userId = pb.authStore?.model?.id || null;
        await getData('users', userId);
        set(
          produce((draft) => {
            draft.isLoggedOut = true;
          })
        );
        pb.authStore.clear();
        removeStorageData('autoLogin');
      } catch (error) {
        console.error('Error removing user:', error.message);
      }
    }
  };

  // 로그인 핸들러 또는 상태 초기화
  const resetLogoutState = () => {
    set(
      produce((draft) => {
        draft.isLoggedOut = false; // 로그인 시 isLoggedOut을 false로 설정
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleLogout,
    resetLogoutState, // 로그인 시 상태 초기화를 위한 함수
  };
});
