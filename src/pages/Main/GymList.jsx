import { AppLoading, AppList } from '@/components';
import { mainStore } from '@/stores/mainStore';
import { memo } from 'react';

function GymList() {
  const { filterGyms, isGymsLoaded, gymListLoading } = mainStore((s) => ({
    filterGyms: s.searchInput.filterGyms,
    isGymsLoaded: s.searchInput.isGymsLoaded,
    gymListLoading: s.searchInput.gymListLoading,
  }));

  return (
    <>
      <AppLoading isLoading={!isGymsLoaded || gymListLoading} />
      <AppList items={filterGyms} />
    </>
  );
}

export default memo(GymList);
