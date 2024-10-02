import SearchBar from './SearchBar';
import MapLink from './MapLink';
import FilterList from './FilterList';
import GymList from './GymList';
import { AppNav, AppMeta } from '@/components';
import { mainStore } from '@/stores/mainStore';
import { useEffect, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWishList } from '@/tanstackQuery/fetchWishList';

function Main() {
  const { getCurrentLocation, isWishListLoaded } = mainStore((s) => ({
    getCurrentLocation: s.handleMethod.getCurrentLocation,
    isWishListLoaded: s.searchInput.isWishListLoaded,
  }));
  useQuery({
    queryKey: ['wishList'],
    queryFn: fetchWishList,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !isWishListLoaded,
  });

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

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
