import { create } from 'zustand';
import { produce } from 'immer';
import { getAllData, getData } from '@/api/CRUD';

export const mainStore = create((set) => {
  const INITIAL_STATE = {
    searchInput: {
      inputValue: '',
      searchWord: '',
      gymsList: [],
      filterGyms: [],
      isGymsLoaded: false,
      selectedFilters: [],
      gymData: {},
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
    const filtername = target.getAttribute('filtername');

    set(
      produce((draft) => {
        // 특정 동의 항목의 상태를 반전시킵니다.
        draft.searchFilter[filtername][name] =
          !draft.searchFilter[filtername][name];
      })
    );
  };

  // 선택한 필터 리스트를 새로운 배열로 반환해주는 핸들러
  const handleSelectedFilters = () => {
    let updatedFilters = [];

    set(
      produce((draft) => {
        Object.keys(draft.searchFilter).forEach((key) => {
          const trueFilters = Object.entries(draft.searchFilter[key])
            .filter(([, value]) => value === true)
            .map(([k]) => k);

          if (trueFilters.length > 0) {
            updatedFilters.push(...trueFilters);
          }
        });

        // console.log(updatedFilters);
      })
    );
  };

  // 상태 초기화 및 데이터 로드
  const initializeGyms = async () => {
    const { isGymsLoaded } = mainStore.getState().searchInput;

    if (!isGymsLoaded) {
      await getGymsList();
    }
  };

  // DB에서 헬스장 리스트 가져오기
  const getGymsList = async () => {
    const data = await getAllData('gyms', '-created');

    if (data && Array.isArray(data)) {
      set(
        produce((draft) => {
          draft.searchInput.gymsList = data;
          draft.searchInput.filterGyms = data;
          draft.searchInput.isGymsLoaded = true;
        })
      );
    }
  };

  // 검색어 입력 처리
  const handleSearchInput = (value) => {
    set(
      produce((draft) => {
        draft.searchInput.inputValue = value;
        draft.searchInput.searchWord = value;
      })
    );
  };

  // 검색 제출 처리
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const { searchWord, gymsList } = mainStore().getState();
    set(
      produce((draft) => {
        if (searchWord.trim() === '') {
          draft.searchInput.filterGyms = gymsList;
        } else {
          const filtered = gymsList.filter((gym) =>
            gym.name.toLowerCase().includes(searchWord.toLowerCase())
          );
          draft.searchInput.filterGyms = filtered;
        }
      })
    );
  };

  //gyms에서 아이디가 일치하는 데이터 값을 가져오는 함수
  const fetchGymDetails = async (gymId) => {
    const data = await getData('gyms', gymId);
    console.log(data);
    set(
      produce((draft) => {
        draft.searchInput.gymData = data;
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleMethod: {
      handleCheckboxChange,
      initializeGyms,
      handleSearchInput,
      handleSearchSubmit,
      handleSelectedFilters,
      fetchGymDetails,
    },
  };
});
