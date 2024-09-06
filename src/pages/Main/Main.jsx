import SearchBar from './SearchBar';
import MapLink from './MapLink';
import GymList from './GymList';
import { AppNav } from '@/components';
import AppMeta from '@/components/AppMeta';

export default function Main() {
  return (
    <>
      <AppMeta title="메인페이지" description="메인페이지입니다." />

      <header className="flex items-center gap-1 m-4">
        <h1 className="sr-only">다있짐 메인페이지</h1>

        <SearchBar />
        <MapLink />
      </header>
      <GymList />
      <AppNav />
    </>
  );
}
