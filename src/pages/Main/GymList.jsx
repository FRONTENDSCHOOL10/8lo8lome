import { AppLoading, AppList } from '@/components';
import { mainStore } from '@/stores/mainStore';
import { useState, useEffect, memo } from 'react';

function GymList() {
  const { filterGyms, isGymsLoaded } = mainStore((s) => ({
    filterGyms: s.searchInput.filterGyms,
    isGymsLoaded: s.searchInput.isGymsLoaded,
  }));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isGymsLoaded) {
      setIsLoading(false);
    }
  }, [isGymsLoaded]);
  return (
    <>
      <AppLoading isLoading={isLoading} />
      <AppList items={filterGyms} />
    </>
  );
}

export default memo(GymList);
