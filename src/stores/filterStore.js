import { create } from 'zustand';
import { produce } from 'immer';
import { mainStore } from './mainStore';

export const useFilterStore = create((set) => {
  const { setNearbyGyms } = mainStore.getState().handleMethod;
  const INITIAL_STATE = {
    searchWord: '',
    updatedFilters: [],
    searchFilter: {
      rating: {
        star1: false,
        star2: false,
        star3: false,
        star4: false,
        star5: false,
      },
      healthPrice: {
        monthly10: false,
        monthly15: false,
        monthly20: false,
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
    },
  };

  // 검색어 입력 처리
  const handleSearchInput = (value) => {
    set(
      produce((draft) => {
        draft.searchWord = value;
      })
    );

    // 검색어가 비어 있으면 필터링된 헬스장을 초기화
    if (!value.trim()) {
      const { filteredGymsByDistance } = mainStore.getState().searchInput;

      setNearbyGyms(filteredGymsByDistance);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const { filteredGymsByDistance } = mainStore.getState().searchInput;
    const { searchWord } = useFilterStore.getState();

    // 검색어가 없으면 필터 적용된 헬스장 리스트 반환
    if (!searchWord.trim()) return;

    const searchLower = searchWord.toLowerCase().trim();
    const searchPrice = parseInt(searchLower.replace(/[^0-9]/g, ''), 10); // 숫자 이외의 문자 제거

    // 헬스장 이름, 주소, 일일권 가격이 검색어와 일치하는 헬스장 필터링
    const filteredGyms = filteredGymsByDistance.filter((gym) => {
      const gymName = gym.name.toLowerCase();
      const gymAddress = gym.address.toLowerCase();
      const gymOneDayPrice = gym.oneDayPrice; // 숫자 그대로 비교

      // 이름, 주소 또는 일일권 가격과 검색어 비교
      return (
        gymName.includes(searchLower) ||
        gymAddress.includes(searchLower) ||
        (searchPrice && gymOneDayPrice === searchPrice)
      );
    });
    // 필터링된 헬스장 리스트 업데이트
    setNearbyGyms(filteredGyms);
  };

  const handleCheckboxChange = (target) => {
    const { name } = target;
    const filterName = target.getAttribute('data-filtername');

    set(
      produce((draft) => {
        const isSelected = draft.searchFilter[filterName][name]; // 현재 선택된 상태 확인

        if (filterName !== 'amenities') {
          Object.keys(draft.searchFilter[filterName]).forEach((key) => {
            draft.searchFilter[filterName][key] = false;
          });
        }

        // 선택된 항목이 이미 true였다면 체크 해제, 아니면 선택
        draft.searchFilter[filterName][name] = !isSelected;
      })
    );
    updateCheckedFilters();
  };

  const applyRatingFilter = (gym, filterNames) => {
    const rating = gym.rating; // gym 객체에서 별점 값 가져오기
    return filterNames.some((filterName) => {
      const starRating = parseInt(filterName.replace('star', ''), 10);
      return rating >= starRating; // 별점이 해당 필터보다 크거나 같은 경우
    });
  };
  // 가격 필터를 처리하는 함수
  const applyPriceFilter = (gym, filterNames) => {
    const gymPrices = gym.healthPrice || {};

    const oneMonthPrice = gymPrices['1Month']
      ? parseInt(gymPrices['1Month'], 10)
      : null;

    if (!oneMonthPrice) return;

    const filters = filterNames.every((filterName) => {
      const maxPrice = parseInt(filterName.replace('monthly', ''), 10) * 10000;
      return oneMonthPrice <= maxPrice;
    });
    return filters;
  };
  // pt가격 필터를 처리하는 함수
  const applyPtPriceFilter = (gym, filterNames) => {
    const ptPrice = gym.PtPrice || {};

    const tenSessionsPrice = ptPrice['10Sessions']
      ? parseInt(ptPrice['10Sessions'], 10)
      : null;

    if (!tenSessionsPrice) return;

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
    const { searchFilter } = useFilterStore.getState();
    const { filteredGymsByDistance } = mainStore.getState().searchInput;
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
    const filteredGyms =
      Object.keys(checkedFilters).length === 0
        ? filteredGymsByDistance // 필터가 없으면 원래 리스트로
        : filteredGymsByDistance.filter((gym) => {
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
                if (filterCategory === 'PtPrice') {
                  // PT 가격 필터 처리
                  return applyPtPriceFilter(gym, filterNames);
                }
                if (filterCategory === 'amenities') {
                  // 편의시설 필터 처리
                  return applyAmenitiesFilter(gym, filterNames);
                }
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
      })
    );
    setNearbyGyms(filteredGyms);
  };

  const handleSelectedFilters = () => {
    const amenitiesMapping = {
      parking: '주차장',
      wifi: 'Wi-Fi',
      showerRoom: '샤워실',
      locker: '개인락커',
      clothes: '운동복',
      gxRoom: 'GX룸',
    };
    set(
      produce((draft) => {
        // 기존에 저장된 updatedFilters를 초기화
        draft.updatedFilters = [];

        // searchFilter를 순회하며 true인 필터 추출 및 변환
        Object.keys(draft.searchFilter).forEach((key) => {
          const trueFilters = Object.entries(draft.searchFilter[key])
            .filter(([, value]) => value === true)
            .map(([filterName]) => {
              // 별점 필터 변환
              if (filterName.startsWith('star')) {
                const stars = filterName.replace('star', '');
                return `별점 ${stars}점`;
              }
              // 헬스 가격 필터 변환
              if (filterName.startsWith('monthly')) {
                const price = filterName.replace('monthly', '');
                return `월 ${price}만원`;
              }
              // PT 가격 필터 변환
              if (filterName.startsWith('pt')) {
                const price = filterName.replace('pt', '');
                return `PT 10회 ${price}만원`;
              }
              // 어메니티 필터 변환 (편의시설)
              if (amenitiesMapping[filterName]) {
                return amenitiesMapping[filterName];
              }
              return filterName; // 변환 불가한 필터는 그대로 반환
            });

          // 변환된 필터가 있으면 updatedFilters 배열에 추가
          if (trueFilters.length > 0) {
            draft.updatedFilters.push(...trueFilters);
          }
        });
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleMethod: {
      handleSearchInput,
      handleSearchSubmit,
      handleCheckboxChange,
      handleSelectedFilters,
    },
  };
});
