import { create } from 'zustand';
import { produce } from 'immer';
import { getAllData, getData, updateData } from '@/api/CRUD';
import {
  geocodeAddress,
  getUserLocation,
  getDistanceFromLatLonInKm,
  loadPostcodeScript,
  extractDistrict,
} from '@/utils';
import axios from 'axios';
import pb from '@/api/pb';
import { useMapStore } from './mapStore';

export const mainStore = create((set) => {
  const INITIAL_STATE = {
    searchInput: {
      gymsList: [],
      filterGyms: [],
      isGymsLoaded: false,
      selectedFilters: [],
      gymData: {},
      trainerList: {},
      trainerData: {},
      wishList: [],
      wishListChecked: {},
      filteredGymsByDistance: [],
    },
    selectedLocation: '위치를 불러오는 중...',
    locationLoading: true,
    gymListLoading: true,
    userId: pb.authStore.model?.id || '',
    locationAddress: {},
    gymDetailLocation: {},
    currentLocation: {},
    trainerDetailPath: '',
    selectedTrainerId: '',
    currentSwiperTrainerId: '',
  };

  const setFilteredGyms = (gyms) => {
    set(
      produce((draft) => {
        draft.searchInput.filterGyms = gyms;
      })
    );
  };

  // getGymsList 함수에서 위치를 매개변수로 받도록 수정
  const getGymsList = async (latitude, longitude) => {
    try {
      // 로딩 중 상태를 설정하여 무한 루프 방지
      set(
        produce((draft) => {
          draft.searchInput.gymListLoading = true; // 로딩 중 상태 추가
        })
      );

      // 서버에서 헬스장 데이터 가져오기
      const gyms = await getAllData('gyms', '-created');
      // 위치가 없으면 현재 위치로 설정
      if (!latitude || !longitude) {
        const userLocation = await getUserLocation();
        latitude = userLocation.latitude;
        longitude = userLocation.longitude;

        set(
          produce((draft) => {
            draft.locationAddress.latitude = latitude;
            draft.locationAddress.longitude = longitude;
          })
        );
      }

      // 헬스장 목록 필터링
      const filteredGyms = await filterGymsByDistance(
        gyms,
        latitude,
        longitude
      );
      // 데이터 로드 완료
      set(
        produce((draft) => {
          draft.searchInput.gymsList = gyms;
          draft.searchInput.filteredGymsByDistance = filteredGyms;
          draft.searchInput.filterGyms = filteredGyms;
          draft.searchInput.isGymsLoaded = true; // 로드 완료
          draft.searchInput.gymListLoading = false; // 로딩 상태 해제
        })
      );
    } catch (error) {
      console.error('헬스장 목록 업데이트 중 오류가 발생했습니다.', error);
    }
  };

  // GymDetail에서 아이디가 일치하는 데이터 값을 가져오는 함수
  const fetchGymDetails = (gymId) => {
    // 현재 상태에서 gymsList 가져오기
    const { gymsList } = mainStore.getState().searchInput;

    // gymsList에서 gymId와 일치하는 헬스장 찾기
    const gymData = gymsList.find((gym) => gym.id === gymId);

    if (!gymData) return;

    mainStore.setState(
      produce((draft) => {
        draft.searchInput.gymData = gymData;
      })
    );
  };

  // 헬스장 리스트 필터링 및 정렬 함수
  const filterGymsByDistance = async (gyms, userLat, userLon) => {
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
      const { initializeMap } = useMapStore.getState();
      const currentLocation = await getUserLocation();
      const { latitude, longitude } = currentLocation;
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
            draft.locationLoading = false;
            draft.currentLocation = {
              currentLatitude: latitude,
              currentLongitude: longitude,
            };
          })
        );
        initializeMap(currentLocation);
      } else {
        throw new Error('No address found');
      }
    } catch (error) {
      console.error('Error fetching current location or address:', error);
      set(
        produce((draft) => {
          draft.selectedLocation = '주소를 가져오는 데 실패했습니다.';
          draft.locationLoading = false;
        })
      );
    }
  };

  // 카카오 주소 검색 스크립트 URL
  const searchLocation = async () => {
    try {
      // 주소 검색 스크립트 로드
      await loadPostcodeScript();

      // 카카오 주소 검색 API 초기화 및 오픈
      window.daum.postcode.load(async () => {
        try {
          const { initializeMap } = useMapStore.getState();
          new window.daum.Postcode({
            oncomplete: async (data) => {
              // 주소 선택 시 처리
              const address = data.address;
              const district = extractDistrict(address);

              // 상태 업데이트: 주소 및 로딩 상태
              set(
                produce((draft) => {
                  draft.selectedLocation = district;
                  draft.locationLoading = false;
                })
              );

              // 주소로부터 좌표를 가져오기 위한 함수 호출
              const selectedLocation = await geocodeAddress(address);
              const { latitude, longitude } = selectedLocation;

              set(
                produce((draft) => {
                  draft.locationAddress['latitude'] = latitude;
                  draft.locationAddress['longitude'] = longitude;
                })
              );

              // 헬스장 목록 가져오기
              await getGymsList(latitude, longitude);
              initializeMap(selectedLocation, '설정위치');
            },
            onerror: (error) => {
              console.error('주소 검색 중 오류가 발생했습니다.', error);
              set(
                produce((draft) => {
                  draft.selectedLocation = '주소를 가져오는 데 실패했습니다.';
                  draft.locationLoading = false;
                })
              );
            },
          }).open();
        } catch (error) {
          console.error('주소 변환 중 오류가 발생했습니다.', error);
          set(
            produce((draft) => {
              draft.selectedLocation = '주소를 가져오는 데 실패했습니다.';
              draft.locationLoading = false;
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
          draft.locationLoading = false;
        })
      );
    }
  };

  const setWishList = async (target) => {
    const { name, checked } = target;
    const { filterGyms, wishList } = mainStore.getState().searchInput;
    const gym = filterGyms.find((gym) => gym.name === name);

    if (!gym) {
      console.log('헬스장을 찾을 수 없습니다.');
      return;
    }

    const {
      address,
      photo,
      id,
      collectionId,
      collectionName,
      oneDayPrice,
      rating,
      wishListCount,
    } = gym;

    set(
      produce((draft) => {
        draft.searchInput.wishListChecked[name] = checked;

        if (checked) {
          // 체크된 경우 wishList에 추가
          if (!wishList.some((item) => item.name === name)) {
            const gymData = {
              address,
              photo,
              id,
              collectionId,
              collectionName,
              oneDayPrice,
              rating,
              name,
            };
            draft.searchInput.wishList.push(gymData);
          } else {
            console.log('이미 wishList에 있음.');
          }
        } else {
          // 체크 해제된 경우 wishList에서 제거
          draft.searchInput.wishList = wishList.filter(
            (item) => item.name !== name
          );
        }
      })
    );

    try {
      const updatedWishList = mainStore.getState().searchInput.wishList;
      const wishListChecked =
        mainStore.getState().searchInput.wishListChecked[name];
      const userId = mainStore.getState().userId;

      // PocketBase에 wishList 업데이트
      await updateData('users', userId, { wishList: updatedWishList });

      // 체크 상태에 따라 wishListCount 업데이트
      const updatedWishListCount = wishListChecked
        ? wishListCount + 1
        : wishListCount - 1;

      // 해당 헬스장 데이터의 wishListCount 업데이트
      set(
        produce((draft) => {
          const gymIndex = draft.searchInput.filterGyms.findIndex(
            (gym) => gym.name === name
          );
          if (gymIndex !== -1) {
            draft.searchInput.filterGyms[gymIndex].wishListCount =
              updatedWishListCount;
          }
        })
      );

      // PocketBase에 해당 헬스장의 wishListCount 업데이트
      await updateData('gyms', id, { wishListCount: updatedWishListCount });
    } catch (error) {
      console.error('PocketBase에 데이터 업데이트 실패:', error);
    }
  };

  const fetchWishList = async () => {
    const { wishList } = mainStore.getState().searchInput;

    // 이미 wishList가 있다면 추가 요청을 하지 않음
    if (wishList.length > 0) {
      console.log('이미 불러온 wishList 사용');
      return;
    }

    try {
      const userId = mainStore.getState().userId;
      const userData = await getData('users', userId);
      const wishList = userData.wishList || [];

      set(
        produce((draft) => {
          draft.searchInput.wishList = wishList;
          wishList.forEach((gym) => {
            draft.searchInput.wishListChecked[gym.name] = true;
          });
        })
      );
    } catch (error) {
      console.error('유저 wishList 가져오기 실패:', error);
    }
  };

  // 헬스장 디테일 페이지에서 gymData의 주소를 받으면 Kakao Geocoding API를 이용해 좌표로 변환해 주는 함수
  const getGymLocation = async (address) => {
    try {
      const { latitude, longitude } = await geocodeAddress(address);
      set(
        produce((draft) => {
          draft.gymDetailLocation = { latitude, longitude };
        })
      );
    } catch (error) {
      console.error('Error fetching gym location or address:', error);
    }
  };

  // 헬스장 디테일 페이지에서 gymData를 통해 trainerds 정보를 가져오는 함수
  const getTrainersFromGymData = async (trainerIds) => {
    if (Array.isArray(trainerIds) && trainerIds.length > 0) {
      const formattedTrainerIds = trainerIds
        .map((id) => `id = '${id}'`)
        .join('||');
      const data = await getAllData(
        'trainers',
        '-created',
        `${formattedTrainerIds}`
      );

      set(
        produce((draft) => {
          draft.searchInput.trainerList = data;
        })
      );
    } else {
      set(
        produce((draft) => {
          draft.searchInput.trainerList = [];
        })
      );
    }
  };

  // TrainerDetail페이지에서 데이터 패치하는 함수(접근 가능한 루트: 헬스장에서 접근, 헬스장 리뷰에서 접근, 리뷰관리에서 접근)
  const fetchTrainerDetails = async (trainerId) => {
    const { trainerDetailPath } = mainStore.getState();
    const { trainerList } = mainStore.getState().searchInput;
    let trainerData;

    if (trainerDetailPath === 'users') {
      trainerData = await getData('trainers', trainerId);
    } else {
      trainerData = trainerList.find((trainer) => trainer.id === trainerId);

      if (!trainerData) {
        return;
      }
    }

    set(
      produce((draft) => {
        draft.searchInput.trainerData = trainerData;
      })
    );
  };

  // 리뷰관리에서 트레이너 디테일로 접근하는 경우를 체크하기 위해 trainerDetailPath 값을 세팅하는 함수
  const setTrainerDetailPath = (collectionName) => {
    set(
      produce((draft) => {
        draft.trainerDetailPath = collectionName;
      })
    );
  };

  // 트레이너 디테일 페이지로 이동시 선택한 trainer의 Id 값 저장하는 함수
  const setSelectedTrainerId = (trainerId) => {
    set(
      produce((draft) => {
        draft.selectedTrainerId = trainerId;
        draft.currentSwiperTrainerId = trainerId;
      })
    );
  };

  // 트레이너 디테일 페이지에서 스와이퍼 슬라이드 시 해당 키 값 저장
  const handleTrainerSwiperChange = (swiper) => {
    const { trainerList } = mainStore.getState().searchInput;
    const currentIndex = swiper.activeIndex;
    const selectedTrainerId = trainerList[currentIndex]?.id;
    const trainerData = trainerList.find(
      (trainer) => trainer.id === selectedTrainerId
    );

    set(
      produce((draft) => {
        draft.currentSwiperTrainerId = selectedTrainerId;
        draft.searchInput.trainerData = trainerData;
      })
    );
  };

  return {
    ...INITIAL_STATE,
    handleMethod: {
      fetchGymDetails,
      getGymsList,
      getCurrentLocation,
      searchLocation,
      setWishList,
      fetchWishList,
      getGymLocation,
      getTrainersFromGymData,
      fetchTrainerDetails,
      setTrainerDetailPath,
      setSelectedTrainerId,
      handleTrainerSwiperChange,
      setFilteredGyms,
    },
  };
});
