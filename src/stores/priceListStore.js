import { create } from 'zustand';
import { produce } from 'immer';
import { mainStore } from './mainStore';

export const usePriceListStore = create((set) => {
  const INITIAL_STATE = {
    selectedItems: {}, // 선택된 항목을 저장할 객체
    selectedPricing: {}, // name별로 선택된 가격을 저장할 객체
    totalPrices: {},
    membershipKey: '',
    membershipDuration: null,
    isClothesAndLocker: false,
  };

  const updatePricesWithNewDuration = (draft) => {
    const { healthPrice } = mainStore.getState().searchInput.gymData;
    const { isClothesAndLocker } = usePriceListStore.getState();

    if (!isClothesAndLocker) {
      // 전체 금액을 0으로 설정하고 선택된 항목들을 초기화
      Object.keys(draft.selectedItems).forEach((name) => {
        draft.totalPrices[name] = 0; // 가격 0으로 설정
        delete draft.selectedItems[name]; // 선택 해제
      });
      return; // 함수 종료
    }

    // `isClothesAndLocker`가 true일 경우에만 가격 업데이트
    Object.keys(draft.selectedItems).forEach((name) => {
      let checkName = '';
      if (name === '운동복') {
        checkName = 'workoutClothes';
      } else if (name === '개인락커') {
        checkName = 'personalLocker';
      }

      const itemPrice =
        healthPrice[checkName] === '무료' ? 0 : healthPrice[checkName];
      draft.totalPrices[name] = itemPrice * draft.membershipDuration;
    });
  };

  const handleToggle = (target) => {
    const { healthPrice } = mainStore.getState().searchInput.gymData;
    const { name } = target;
    const { selectedPricing, membershipDuration } =
      usePriceListStore.getState();
    const membershipKey = selectedPricing['health']; // 현재 선택된 회원권

    let checkName = '';
    if (name === '운동복') {
      checkName = 'workoutClothes';
    } else if (name === '개인락커') {
      checkName = 'personalLocker';
    }

    set(
      produce((draft) => {
        draft.membershipKey = membershipKey;
        // 선택된 항목이 이미 존재하면 제거하고, 없으면 추가
        if (draft.selectedItems[name]) {
          delete draft.selectedItems[name]; // 선택 해제
          draft.totalPrices[name] = 0; // 가격 0으로 설정
        } else {
          draft.selectedItems[name] = true; // 선택 시 가격 반영

          // 가격 설정
          const itemPrice =
            healthPrice[checkName] === '무료' ? 0 : healthPrice[checkName]; // 해당 항목의 기본 가격을 설정
          draft.totalPrices[name] = itemPrice * membershipDuration; // 현재 기간에 맞춰 가격 계산
        }

        // 가격 업데이트
        updatePricesWithNewDuration(draft);
      })
    );
  };
  const handleCheckPricing = (name, key, price) => {
    const { totalPrices, membershipDuration, selectedPricing } =
      usePriceListStore.getState();
    let membershipKey = key;
    let setMembershipDuration =
      name === 'health'
        ? parseInt(membershipKey?.replace(/\D/g, ''), 10)
        : membershipDuration;

    set(
      produce((draft) => {
        const previousKey = selectedPricing[name];
        if (previousKey === key) {
          // 체크 해제
          delete draft.selectedPricing[name];
          draft.isClothesAndLocker = false;
        } else {
          // 선택된 가격 업데이트
          if (previousKey) {
            // 이전 선택이 있으면 가격 감소
            const previousPrice = totalPrices[previousKey] || 0; // 이전 가격 찾기
            draft.totalPrices[name] =
              (draft.totalPrices[name] || 0) - previousPrice; // 이전 가격 감소
          }

          draft.selectedPricing[name] = key; // 새로운 선택 업데이트
          draft.totalPrices[name] = price; // 현재 선택된 가격 설정
          draft.isClothesAndLocker = true;
        }

        if (membershipKey?.includes('day')) {
          draft.membershipDuration = 0; // 1day는 추가 비용을 적용하지 않음
        } else {
          draft.membershipDuration = setMembershipDuration; // 새로운 membershipDuration을 상태에 저장
        }

        // 선택된 항목들의 가격을 재계산
        updatePricesWithNewDuration(draft); // 선택된 항목들의 가격을 다시 계산
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleToggle,
    handleCheckPricing,
  };
});
