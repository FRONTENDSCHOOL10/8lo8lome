import SearchBar from './SearchBar';
import MapLink from './MapLink';
import FilterList from './FilterList';
import GymList from './GymList';
import { AppNav } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo, useEffect } from 'react';
import { getAllData } from '@/api/CRUD';
import { useSearchStore } from '../../stores/mainStore';

function Main() {
  const gymsList = useSearchStore((state) => state.gymsList);
  const searchWord = useSearchStore((state) => state.searchWord);

  const handleSearch = (value) => {
    useSearchStore.getState().setSearchWord(value); // Zustand 상태 업데이트
  };

  useEffect(() => {
    const getGymsList = async () => {
      try {
        const data = await getAllData('gyms', '-created');
        console.log('데이터:', data);

        if (data && Array.isArray(data)) {
          useSearchStore.getState().setGymsList(data);
          useSearchStore.getState().setFilterGyms(data);
        } else {
          console.error('데이터를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
      }
    };
    getGymsList();
  }, []);

  useEffect(() => {
    if (searchWord.trim() === '') {
      useSearchStore.getState().setFilterGyms(gymsList);
    } else {
      const handleFilterGyms = gymsList.filter((gym) =>
        gym.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      useSearchStore.getState().setFilterGyms(handleFilterGyms);
    }
  }, [searchWord, gymsList]);

  return (
    <>
      <AppMeta title="메인페이지" description="메인페이지입니다." />

      <header className="flex items-center gap-1 m-4">
        <h1 className="sr-only">다있짐 메인페이지</h1>

        <SearchBar onSearch={handleSearch} />
        <MapLink />
      </header>
      <FilterList />
      <GymList />
      <AppNav />
    </>
  );
}

export default memo(Main);
