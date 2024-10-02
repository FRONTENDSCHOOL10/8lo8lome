import { AppLoading, AppList } from '@/components';
import { mainStore } from '@/stores/mainStore';
import { fetchGymsList } from '@/tanstackQuery/fetchGymsList';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect } from 'react';

function GymList() {
  const { setFilteredGyms, filteredGyms } = mainStore((s) => ({
    setFilteredGyms: s.handleMethod.setFilteredGyms,
    filteredGyms: s.searchInput.filterGyms,
  }));

  const useGymsList = (latitude, longitude) => {
    return useQuery({
      queryKey: ['gymsList', latitude, longitude],
      queryFn: () => fetchGymsList({ latitude, longitude }),
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    });
  };

  const { data, isLoading } = useGymsList(null, null);

  useEffect(() => {
    if (data && data.filteredGyms) {
      setFilteredGyms(data.filteredGyms);
    }
  }, [data, setFilteredGyms]);

  // 필터링된 헬스장 목록을 가져옴
  const gymsToDisplay = filteredGyms.length > 0 ? filteredGyms : [];

  if (isLoading) {
    return <AppLoading isLoading={isLoading} />;
  }

  return <AppList items={gymsToDisplay} />;
}

export default memo(GymList);
