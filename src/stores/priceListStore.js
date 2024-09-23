import { create } from 'zustand';
import { produce } from 'immer';
import { mainStore } from './mainStore';
import { getData, updateData } from '@/api/CRUD';
import { getPbImageURL } from '@/utils';

export const usePriceListStore = create((set) => {
  const INITIAL_STATE = {
    selectedItems: {}, // 선택된 항목을 저장할 객체
    selectedPricing: {}, // name별로 선택된 가격을 저장할 객체
    totalPrices: {},
    membershipKey: '',
    membershipDuration: null,
    isClothesAndLocker: false,
    paymentHistory: [],
    isPayment: false,
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

      const itemPrice = healthPrice[checkName]; // 가격 가져오기
      // itemPrice가 유효한 경우에만 가격 계산
      draft.totalPrices[name] =
        itemPrice && itemPrice !== '무료'
          ? itemPrice * draft.membershipDuration
          : 0; // 가격 계산
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
          const itemPrice = healthPrice[checkName]; // 가격 가져오기
          // 무료 체크 제거, 기본 가격을 0으로 초기화
          draft.totalPrices[name] = itemPrice
            ? itemPrice * membershipDuration
            : 0; // 가격 계산
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
          draft.totalPrices[name] = 0; // 가격 0으로 설정

          // 선택된 항목이 더 이상 없으면 isClothesAndLocker를 false로 설정
          const remainingKeys = Object.keys(draft.selectedPricing);
          if (remainingKeys.length === 0) {
            draft.isClothesAndLocker = false;
          }
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
          draft.isClothesAndLocker = true; // 항목이 선택되면 true로 설정
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

  const submitPayment = async (gymId) => {
    const { totalPrices, membershipDuration, selectedPricing } =
      usePriceListStore.getState();
    const { userId } = mainStore.getState();

    // 전체 결제 금액 계산
    const totalAmount = Object.values(totalPrices).reduce(
      (sum, price) => sum + price,
      0
    );

    if (totalAmount === 0) return;

    // 결제 날짜 및 종료 날짜 계산
    const paymentDate = new Date(); // 현재 날짜

    const endDate = new Date(paymentDate); // 종료 날짜를 현재 날짜로 초기화
    endDate.setMonth(endDate.getMonth() + membershipDuration); // 선택한 개월 수만큼 더함

    const timeDifference = endDate - paymentDate; // 밀리초 단위의 차이
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const dayData = days > 0 ? days - 1 : 0;

    // 결제 상품 이름 및 가격 생성
    const selectedProducts = Object.keys(selectedPricing).map((name) => {
      const key = selectedPricing[name];
      let productName = '';

      // 상품 이름 정의
      if (key === '1day') {
        productName = '일일권';
      } else if (key === '1Month') {
        productName = '1개월권';
      } else if (key === '3Months') {
        productName = '3개월권';
      } else if (key === '6Months') {
        productName = '6개월권';
      } else if (key === '12Months') {
        productName = '12개월권';
      } else if (key === 'personalLocker') {
        productName = '개인락커';
      } else if (key === 'workoutClothes') {
        productName = '운동복';
      } else if (key === '10Sessions') {
        productName = '10회 체험권';
      } else if (key === '20Sessions') {
        productName = '20회 체험권';
      } else if (key === '30Sessions') {
        productName = '30회 체험권';
      } else if (key === 'singleSession') {
        productName = '개별 수업';
      }
      console.log(totalPrices);
      return {
        name: productName, // 상품 이름
        key: key, // 상품 키
        price: totalPrices[key] || 0, // 결제 금액
      };
    });
    const data = await getData('gyms', gymId);
    const photo = getPbImageURL(data)[0];

    // paymentData 배열에 객체 형태로 담기
    const paymentData = {
      gymId: gymId,
      name: data.name,
      totalAmount: totalAmount,
      paymentDate: paymentDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      products: selectedProducts,
      photo: photo,
      dayData: dayData >= 0 ? dayData : 0, // 남은 일수를 'days'로 추가
    };

    try {
      // 먼저 사용자 데이터를 가져옵니다.
      const user = await getData('users', userId);
      // 기존 결제 내역을 가져옵니다. 없으면 빈 배열로 초기화합니다.
      const existingPaymentHistory = user.paymentHistory || [];
      // 새로운 결제 데이터를 추가합니다.
      const updatedPaymentHistory = [...existingPaymentHistory, paymentData];
      // 업데이트 요청을 보냅니다.
      await updateData('users', userId, {
        paymentHistory: updatedPaymentHistory,
      });
      set(
        produce((draft) => {
          draft.isPayment = true;
        })
      );
    } catch (error) {
      console.log('결제 데이터:', error);
    }
  };

  const resetPaymentState = () => {
    set(
      produce((draft) => {
        draft.isPayment = false;
      })
    );
  };

  const getPaymentHistory = async () => {
    const { userId } = mainStore.getState();
    const user = await getData('users', userId);
    set(
      produce((draft) => {
        draft.paymentHistory = user.paymentHistory || [];
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleToggle,
    handleCheckPricing,
    submitPayment,
    resetPaymentState,
    getPaymentHistory,
  };
});
