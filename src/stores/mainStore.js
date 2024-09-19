import { create } from 'zustand';
import { produce } from 'immer';
import { getAllData, getData } from '@/api/CRUD';
import axios from 'axios';
import { geocodeAddress } from '@/utils';
const MapUrl = import.meta.env.VITE_KAKAO_POSTCODE_SCRIPT_URL;

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
      trainerData: {},
      updatedFilters: [],
      wishList: [],
      wishListChecked: {},
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
    },
    selectedLocation: '위치를 불러오는 중...',
    loading: true,
  };

  // 필터 버튼 체크 핸들러
  const handleCheckboxChange = (target) => {
    const { name } = target;
    const filtername = target.getAttribute('data-filtername');

    set(
      produce((draft) => {
        const isSelected = draft.searchFilter[filtername][name]; // 현재 선택된 상태 확인

        if (filtername !== 'amenities') {
          Object.keys(draft.searchFilter[filtername]).forEach((key) => {
            draft.searchFilter[filtername][key] = false;
          });
        }

        // 선택된 항목이 이미 true였다면 체크 해제, 아니면 선택
        draft.searchFilter[filtername][name] = !isSelected;
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
    const { searchFilter } = mainStore.getState();
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
    const filteredGyms = filteredGymsByDistance.filter((gym) => {
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
        draft.searchInput.updatedFilters = [];

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
            draft.searchInput.updatedFilters.push(...trueFilters);
          }
        });
      })
    );
  };

  // 사용자 위치 가져오기 함수
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };
  // getGymsList 함수에서 위치를 매개변수로 받도록 수정
  const getGymsList = async (latitude, longitude) => {
    try {
      // 서버에서 헬스장 데이터 가져오기
      const gyms = await getAllData('gyms', '-created');

      // 위치가 없으면 현재 위치로 설정
      if (!latitude || !longitude) {
        const userLocation = await getUserLocation();
        latitude = userLocation.latitude;
        longitude = userLocation.longitude;
      }

      // 헬스장 목록 필터링
      const filteredGyms = await filterGymsByDistance(
        gyms,
        latitude,
        longitude,
        10
      );

      // Zustand 상태 업데이트 (필터링된 헬스장 데이터 저장)
      set(
        produce((draft) => {
          draft.searchInput.gymsList = gyms; // 필터링된 헬스장 저장
          draft.searchInput.filterGyms = filteredGyms; // 필터링된 헬스장 저장
          draft.searchInput.filteredGymsByDistance = filteredGyms; // 필터링된 헬스장 저장
          draft.searchInput.isGymsLoaded = true; // 데이터 로드 완료
        })
      );
    } catch (error) {
      console.error('헬스장 목록 업데이트 중 오류가 발생했습니다.', error);
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

  const extractDistrict = (address) => {
    // 주소를 공백을 기준으로 나눈 후, '구'나 '시'가 포함된 위치까지 추출
    const addressParts = address.split(' ');

    // '구' 또는 '시'로 끝나는 부분을 찾고 그 이전까지 추출
    const endIndex = addressParts.findIndex(
      (part) => part.includes('구') || part.includes('시')
    );

    // '구'가 포함된 부분까지 잘라내어 반환
    if (endIndex !== -1) {
      return addressParts.slice(0, endIndex + 1).join(' ');
    }
    // '구'가 없으면 전체 반환 (필요에 따라 동으로 처리 가능)
    return address;
  };

  // Haversine 공식을 사용한 거리 계산 함수
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 두 지점 사이 거리 (단위: km)
    return distance;
  };

  // 각도를 라디안으로 변환하는 함수
  const deg2rad = (deg) => deg * (Math.PI / 180);

  // 헬스장 리스트 필터링 및 정렬 함수
  const filterGymsByDistance = async (gyms, userLat, userLon) => {
    // 헬스장들의 좌표를 가져오고 거리 계산 후 필터링
    const gymsWithDistance = await Promise.all(
      gyms.map(async (gym) => {
        const { latitude, longitude } = await geocodeAddress(gym.address);
        const distance = getDistanceFromLatLonInKm(
          userLat,
          userLon,
          latitude,
          longitude
        );
        return {
          ...gym,
          distance,
        };
      })
    );

    // 거리 기준으로 오름차순 정렬 (가장 가까운 헬스장부터)
    const sortedGyms = gymsWithDistance.sort((a, b) => a.distance - b.distance);
    return sortedGyms;
  };

  const getCurrentLocation = async () => {
    try {
      // 사용자 위치 가져오기
      const { latitude, longitude } = await getUserLocation();

      // 카카오 Geocoding API로 좌표를 주소로 변환
      const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
      const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      });

      const data = response.data;
      if (data.documents && data.documents.length > 0) {
        // 주소 추출 및 상태 업데이트
        const address = data.documents[0].address.address_name;
        const district = extractDistrict(address); // 시와 구까지만 추출

        set(
          produce((draft) => {
            draft.selectedLocation = district;
            draft.loading = false;
          })
        );
      } else {
        throw new Error('No address found');
      }
    } catch (error) {
      console.error('Error fetching current location or address:', error);
      set(
        produce((draft) => {
          draft.selectedLocation = '주소를 가져오는 데 실패했습니다.';
          draft.loading = false;
        })
      );
    }
  };

  // 주소 검색 스크립트 로딩
  const loadPostcodeScript = () => {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${MapUrl}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = MapUrl;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('주소 검색 스크립트 로딩 실패'));
      document.body.appendChild(script);
    });
  };

  // 카카오 주소 검색 스크립트 URL
  const searchLocation = async () => {
    try {
      // 주소 검색 스크립트 로드
      await loadPostcodeScript();

      // 카카오 주소 검색 API 초기화 및 오픈
      window.daum.postcode.load(async () => {
        try {
          const postcode = new window.daum.Postcode({
            oncomplete: async (data) => {
              // 주소 선택 시 처리
              const address = data.address;
              const district = extractDistrict(address);

              // 상태 업데이트: 주소 및 로딩 상태
              set(
                produce((draft) => {
                  draft.selectedLocation = district;
                  draft.loading = false;
                })
              );

              // 주소로부터 좌표를 가져오기 위한 함수 호출
              const { latitude, longitude } = await geocodeAddress(address);

              // 헬스장 목록 가져오기
              await getGymsList(latitude, longitude);
            },
            onerror: (error) => {
              console.error('주소 검색 중 오류가 발생했습니다.', error);
              set(
                produce((draft) => {
                  draft.selectedLocation = '주소를 가져오는 데 실패했습니다.';
                  draft.loading = false;
                })
              );
            },
          }).open();
        } catch (error) {
          console.error('주소 변환 중 오류가 발생했습니다.', error);
          set(
            produce((draft) => {
              draft.selectedLocation = '주소를 가져오는 데 실패했습니다.';
              draft.loading = false;
            })
          );
        }
      });
    } catch (error) {
      console.error(
        '주소 검색을 위한 스크립트 로딩 중 오류가 발생했습니다.',
        error
      );
      set(
        produce((draft) => {
          draft.selectedLocation = '주소를 가져오는 데 실패했습니다.';
          draft.loading = false;
        })
      );
    }
  };

  // GymDetail에서 해당하는 트레이너 정보 가져오는 함수
  const fetchTrainers = async (trainerId) => {
    // const { trainerData } = mainStore.getState().searchInput;
    // const data = await getAllData('trainers', 'filter: trainerId');
    // console.log(data);
  };

  const getChecked = (target) => {
    const { name, checked } = target;
    const { gymsList } = mainStore.getState().searchInput;
    console.log(checked);
    set(
      produce((draft) => {
        if (checked) {
          // 체크된 경우, gymsList에서 해당 헬스장 찾기
          const gym = gymsList.find((gym) => gym.name === name);
          draft.searchInput.wishListChecked[name] =
            !draft.searchInput.wishListChecked[name];
          if (
            gym &&
            !draft.searchInput.wishList.some((item) => item.name === name)
          ) {
            draft.searchInput.wishList.push(gym);
          }
        } else {
          // 체크 해제된 경우, wishList에서 해당 헬스장 제거
          draft.searchInput.wishList = draft.searchInput.wishList.filter(
            (item) => item.name !== name
          );
        }
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
      fetchTrainers,
      getCurrentLocation,
      searchLocation,
      getChecked,
    },
  };
});
