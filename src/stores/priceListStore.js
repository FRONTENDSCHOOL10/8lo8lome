import { create } from 'zustand';
import { produce } from 'immer';

export const usePriceListStore = create((set) => {
  const INITIAL_STATE = {
    selectedItems: {}, // 선택된 항목을 저장할 객체
    selectedPricing: {}, // name별로 선택된 가격을 저장할 객체
    totalPrices: {},
  };

  const handleToggle = (target) => {
    const { name } = target;
    set(
      produce((draft) => {
        // 선택된 항목이 이미 존재하면 제거하고, 없으면 추가
        if (draft.selectedItems[name]) {
          delete draft.selectedItems[name];
        } else {
          draft.selectedItems[name] = true;
        }
      })
    );
  };

  const handleCheckPricing = (name, key, price) => {
    const { totalPrices } = usePriceListStore.getState();

    set(
      produce((draft) => {
        const previousKey = draft.selectedPricing[name]; // 이전 선택된 키
        if (previousKey === key) {
          // 체크 해제
          delete draft.selectedPricing[name]; // 선택 해제
          draft.totalPrices[name] = 0; // 가격을 0으로 설정
        } else {
          // 선택된 가격 업데이트
          if (previousKey) {
            // 이전 선택이 있으면 가격 감소
            const previousPrice = totalPrices[previousKey] || 0; // 이전 가격 찾기
            draft.totalPrices[name] =
              (draft.totalPrices[name] || 0) - previousPrice; // 이전 가격 감소
          }
          draft.selectedPricing[name] = key; // 새로운 선택 업데이트
          draft.totalPrices[name] = price; // 새로운 가격 설정
        }
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleToggle,
    handleCheckPricing,
  };
});
