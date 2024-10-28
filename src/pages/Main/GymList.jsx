import { AppLoading, AppList } from '@/components';
import { mainStore } from '@/stores/mainStore';
import { fetchGymsList } from '@/tanstackQuery/fetchGymsList';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect } from 'react';

function GymList() {
  const { setNearbyGyms, nearbyGyms } = mainStore((s) => ({
    setNearbyGyms: s.handleMethod.setNearbyGyms,
    nearbyGyms: s.searchInput.nearbyGyms,
  }));

  const useGymsList = (latitude, longitude) => {
    return useQuery({
      queryKey: ['gymsList', latitude, longitude],
      queryFn: () => fetchGymsList({ latitude, longitude }),
    });
  };

  const { data, isLoading } = useGymsList(null, null);

  useEffect(() => {
    if (!isLoading && data && data.nearbyGyms) {
      setNearbyGyms(data.nearbyGyms);
    }
  }, [data, setNearbyGyms, isLoading]);

  const gymsToDisplay = nearbyGyms ? nearbyGyms : [];

  if (isLoading) {
    return <AppLoading isLoading={isLoading} />;
  }

  return <AppList items={gymsToDisplay} />;
}

export default memo(GymList);
