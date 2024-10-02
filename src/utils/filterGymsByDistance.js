import { geocodeAddress, getDistanceFromLatLonInKm } from './index';

// 헬스장 리스트 필터링 및 정렬 함수
export const filterGymsByDistance = async (gyms, userLat, userLon) => {
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
