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
        pt50: false,
        pt60: false,
        pt70: false,
      },
      amenities: {
        parking: false,
        showerRoom: false,
        gxRoom: false,
        wifi: false,
        locker: false,
        clothes: false,
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
    const filtername = target.getAttribute('data-filtername');
    set(
      produce((draft) => {
        // 특정 동의 항목의 상태를 반전시킵니다.
        draft.searchFilter[filtername][name] =
          !draft.searchFilter[filtername][name];
      })
    );
    updateCheckedFilters();
  };

  // 별점 필터를 처리하는 함수
  const applyRatingFilter = (gym, filterNames) => {
    const rating = gym.rating; // gym 객체에서 별점 값 가져오기
    return filterNames.some((filterName) => {
      const starRating = parseInt(filterName.replace('star', ''), 10);
      return rating >= starRating; // 별점이 해당 필터보다 크거나 같은 경우
    });
  };

  const getMonthlyPrice = (priceData) => {
    const monthlyPrices = {};
    Object.entries(priceData).forEach(([duration, price]) => {
      const months = parseInt(duration.replace('Months', ''), 10);
      if (months > 0) {
        // 월별 가격을 계산하고 천 단위로 반올림
        const monthlyPrice = Math.round(parseInt(price, 10) / months);
        monthlyPrices[duration] = monthlyPrice;
      }
    });
    return monthlyPrices;
  };

  const applyPriceFilter = (gym, filterNames) => {
    const gymPrices = gym.healthPrice || {};
    const gymMonthlyPrices = getMonthlyPrice(gymPrices);
    console.log(gymMonthlyPrices);
    const filters = filterNames.every((filterName) => {
      const maxPrice = parseInt(filterName.replace('monthly', ''), 10) * 10000;
      return Object.values(gymMonthlyPrices).some((price) => price <= maxPrice);
    });
    console.log(filters);
    return filters;
  };

  const applyPtPriceFilter = (gym, filterNames) => {
    const ptPrice = gym.PtPrice || {};
    const tenSessionsPrice = ptPrice['10Sessions'] || 0;
    const filter = filterNames.every((filterName) => {
      const maxPrice = parseInt(filterName.replace('pt', ''), 10) * 10000;
      return tenSessionsPrice <= maxPrice;
    });
    return filter;
  };

  // 편의시설 필터 처리 함수
  const applyAmenitiesFilter = (gym, filterNames) => {
    // 편의시설 데이터를 가져옵니다
    const amenities = gym.amenities || {};
    // 필터링된 편의시설 체크
    return filterNames.every((filterName) => amenities[filterName] === true);
  };

  // 필터링된 헬스장 목록 업데이트 함수
  const updateCheckedFilters = () => {
    const { searchFilter } = mainStore.getState();
    const { gymsList } = mainStore.getState().searchInput;
    const checkedFilters = {};

    // 체크된 필터 추출
    Object.entries(searchFilter).forEach(([filterCategory, filters]) => {
      Object.entries(filters).forEach(([filterName, isChecked]) => {
        if (isChecked) {
          if (!checkedFilters[filterCategory]) {
            checkedFilters[filterCategory] = [];
          }
          checkedFilters[filterCategory].push(filterName);
        }
      });
    });

    // 필터링된 헬스장 목록 업데이트
    const filteredGyms = gymsList.filter((gym) => {
      return Object.entries(checkedFilters).every(
        ([filterCategory, filterNames]) => {
          if (filterCategory === 'rating') {
            // 별점 필터 처리
            return applyRatingFilter(gym, filterNames);
          }
          if (filterCategory === 'healthPrice') {
            // 가격 필터 처리
            return applyPriceFilter(gym, filterNames);
          }
          if (filterCategory === 'ptPrice') {
            // PT 가격 필터 처리
            return applyPtPriceFilter(gym, filterNames);
          }
          if (filterCategory === 'amenities') {
            // 편의시설 필터 처리
            return applyAmenitiesFilter(gym, filterNames);
          }

          // 다른 필터 카테고리 처리
          return filterNames.some(
            (filterName) => gym[filterCategory] === filterName
          );
        }
      );
    });

    // 상태 업데이트
    set(
      produce((draft) => {
        draft.checkedFilters = checkedFilters;
        draft.searchInput.filterGyms = filteredGyms; // 필터링된 헬스장 목록 업데이트
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

  const getGymsList = async () => {
    // 1. 서버에서 헬스장 데이터 가져오기
    const data = await getAllData('gyms', '-created');
    // 2. 데이터가 성공적으로 가져와졌는지 확인
    if (data) {
      // 3. Zustand 상태 업데이트
      set(
        produce((draft) => {
          // 모든 헬스장 데이터 저장
          draft.searchInput.gymsList = data;
          // 필터링용 헬스장 데이터 저장
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

  // GymDetail에서 아이디가 일치하는 데이터 값을 가져오는 함수
  // const fetchGymDetails = async (gymId) => {
  //   const data = await getData('gyms', gymId);

  //   set(
  //     produce((draft) => {
  //       draft.searchInput.gymData = data;
  //     })
  //   );
  // };

  const fetchGymDetails = async (gymId) => {
    const { gymData } = mainStore.getState().searchInput;

    if (gymData && gymData.id === gymId) {
      return;
    }

    const data = await getData('gyms', gymId);

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
      handleSearchInput,
      handleSearchSubmit,
      handleSelectedFilters,
      fetchGymDetails,
      updateCheckedFilters,
      getGymsList,
    },
  };
});
