import AppMeta from '@/components/AppMeta';
import SearchBar from '../SearchBar';
import FilterLink from '../FilterLink';
import { AppHeader } from '@/components';
import { AppNav } from '@/components';

export default function Map() {
  return (
    <>
      <AppMeta title="지도 페이지" description="지도 페이지입니다." />
      <AppHeader></AppHeader>

      <header className="flex items-center gap-1 m-4">
        <h1 className="sr-only">지도 페이지</h1>

        <SearchBar />
        <FilterLink />
      </header>

      <h2>지도 api</h2>

      <AppNav />
    </>
  );
}
