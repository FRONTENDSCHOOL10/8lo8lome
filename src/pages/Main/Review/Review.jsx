import AppMeta from '@/components/AppMeta';
import { AppHeader, AppReviewList } from '@/components';
import { memo, useEffect } from 'react';
import { mainStore } from '@/stores/mainStore';

function Review() {
  const { gymData, setTrainerDetailPath } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
    setTrainerDetailPath: s.handleMethod.setTrainerDetailPath,
  }));

  useEffect(() => {
    if (gymData) {
      setTrainerDetailPath('gyms');
    }
  }, [gymData, setTrainerDetailPath]);

  return (
    <>
      <AppHeader>{gymData.name}</AppHeader>
      <AppMeta
        title="헬스장 리뷰 페이지"
        description="헬스장 리뷰 페이지입니다."
      />
      <AppReviewList
        item={gymData}
        filter={`gym = '${gymData.id}'`}
        expand={'user, trainer'}
      />
    </>
  );
}

export default memo(Review);
