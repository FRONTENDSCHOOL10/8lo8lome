import SearchBar from './SearchBar';
import MapLink from './MapLink';
import FilterList from './FilterList';
import GymList from './GymList';
import { AppNav, AppMeta } from '@/components';
import { mainStore } from '@/stores/mainStore';
import { useEffect, memo } from 'react';

function Main() {
  const { getGymsList, isGymsLoaded, fetchWishList, gymListLoading } =
    mainStore((s) => ({
      getGymsList: s.handleMethod.getGymsList,
      isGymsLoaded: s.searchInput.isGymsLoaded,
      fetchWishList: s.handleMethod.fetchWishList,
      gymListLoading: s.searchInput.gymListLoading,
    }));

  useEffect(() => {
    if (!isGymsLoaded && !gymListLoading) {
      getGymsList();
      fetchWishList();
    }
  }, [isGymsLoaded, getGymsList, fetchWishList, gymListLoading]);

  return (
    <>
      <AppMeta title="메인페이지" description="메인페이지입니다." />
      <header className="flex items-center p-[1.25rem] gap-1">
        <h1 className="sr-only">다있짐 메인페이지</h1>
        <SearchBar />
        <MapLink />
      </header>
      <FilterList />
      <GymList />
      <AppNav />
    </>
  );
}

export default memo(Main);
