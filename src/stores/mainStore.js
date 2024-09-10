import { create } from 'zustand';
import { produce } from 'immer';
import { getAllData } from '@/api/CRUD';

export const useMainStore = create((set) => {
  const INITIAL_STATE = {
    searchInput: {
      inputValue: '',
      searchWord: '',
      gymsList: [],
      filterGyms: [],
    },

    searchFilter: {
      rating: {
        star1: false,
        star2: false,
        star3: false,
        star4: false,
        star5: false,
      },
      healthPrice: {
        monthly3: false,
        monthly5: false,
        monthly6: false,
      },
      ptPrice: {
        pt15: false,
        pt25: false,
        pt30: false,
      },
      amenities: {
        parking: false,
        shower: false,
        gxRoom: false,
        wifi: false,
        personalLocker: false,
        workoutClothes: false,
      },
      trainerCount: {
        oneToTwo: false,
        threeToFour: false,
        fiveToSix: false,
      },
      trainerInfo: {
        healthManager: false,
        sportInstructor: false,
        sportUniGraduate: false,
        bodybuilder: false,
      },
      counselor: {
        available: false,
        notAvailable: false,
      },
      ageGroup: {
        teenTo20: false,
        twentyTo30: false,
        thirtyTo40: false,
        fortyTo50: false,
        fiftyTo60: false,
      },
    },
  };

  // 필터 버튼 체크 핸들러
  const handleCheckboxChange = (target) => {
    const { name } = target;
    set(
      produce((draft) => {
        // 특정 동의 항목의 상태를 반전시킵니다.
        draft.searchFilter.rating[name] = !draft.searchFilter.rating[name];
      })
    );
  };

  // DB에서 헬스장 리스트 가져오기
  const getGymsList = async () => {
    const data = await getAllData('gyms', '-created');

    if (data && Array.isArray(data)) {
      set(
        produce((draft) => {
          draft.searchInput.gymsList = data;
          draft.searchInput.filterGyms = data; // 필터링되지 않은 초기 리스트
        })
      );
    }
  };

  // 상태 초기화 및 데이터 로드
  const initializeGyms = async () => {
    await getGymsList();
  };

  return {
    ...INITIAL_STATE,
    handleMethod: {
      handleCheckboxChange,
      initializeGyms,
    },
  };
});
