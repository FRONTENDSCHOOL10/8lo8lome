import { create } from 'zustand';
import { produce } from 'immer';
import { getData } from '@/api/CRUD';
import pb from '@/api/pb';
import { removeStorageData } from '@/utils';

export const useLogoutStore = create((set) => {
  const INITIAL_STATE = {
    isLoggedOut: false,
    isLoggedIn: false,
  };

  const handleLogout = async () => {
    const result = confirm('정말로 로그아웃 하시겠습니까?');

    if (result) {
      try {
        const userId = pb.authStore?.model?.id || null;
        await getData('users', userId);
        set(
          produce((draft) => {
            draft.isLoggedOut = true;
            draft.isLoggedIn = false;
          })
        );
        pb.authStore.clear();
        removeStorageData('autoLogin');
      } catch (error) {
        console.error('Error removing user:', error.message);
      }
    }
  };
  return {
    ...INITIAL_STATE,
    handleLogout,
  };
});
