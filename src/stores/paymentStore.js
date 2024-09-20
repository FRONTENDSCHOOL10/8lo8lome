import { create } from 'zustand';
import { produce } from 'immer';

export const usePaymentStore = create((set) => {
  const INITIAL_STATE = {
    selectedItems: {}, // 선택된 항목을 저장할 객체
  };

  const handleToggle = (target) => {
    const { name } = target;
    set(
      produce((state) => {
        // 선택된 항목이 이미 존재하면 제거하고, 없으면 추가
        if (state.selectedItems[name]) {
          delete state.selectedItems[name];
        } else {
          state.selectedItems[name] = true;
        }
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleToggle,
  };
});
