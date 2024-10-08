import { create } from 'zustand';
import { deleteData } from '@/api/CRUD';
import pb from '@/api/pb';
import { produce } from 'immer';
import { removeStorageData } from '@/utils';

export const useDeleteIdStore = create((set) => {
  const INITIAL_STATE = {
    isDeleteId: false,
  };

  const handleDeleteUser = async () => {
    const result = confirm('정말 탈퇴 하시겠습니까?');
    if (result) {
      try {
        const userId = pb.authStore?.model?.id || null;
        await deleteData('users', userId);
        set(
          produce((draft) => {
            draft.isDeleteId = true;
          })
        );
        pb.authStore.clear();
        removeStorageData('autoLogin');
      } catch (error) {
        console.error('Error deleting user:', error.message);
      }
    }
  };

  const resetDeleteState = () => {
    set(
      produce((draft) => {
        draft.isDeleteId = false; // 로그아웃 상태를 false로 설정
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleDeleteUser,
    resetDeleteState,
  };
});
