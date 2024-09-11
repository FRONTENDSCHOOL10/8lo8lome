import SearchBar from './SearchBar';
import MapLink from './MapLink';
import FilterList from './FilterList';
import GymList from './GymList';
import { AppNav } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';

function Main() {
  const { initializeGyms } = mainStore((s) => ({
    initializeGyms: s.handleMethod.initializeGyms,
  }));

  initializeGyms();

  return (
    <>
      <AppMeta title="메인페이지" description="메인페이지입니다." />

      <header className="flex items-center gap-1 m-4">
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
