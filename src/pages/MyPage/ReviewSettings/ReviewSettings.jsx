import { AppHeader } from '@/components';
import AppMeta from '@/components/AppMeta';
import { memo, useEffect } from 'react';
import { AppReviewList } from '@/components';
import { useMyPageStore } from '@/stores/myPageStore';
import { mainStore } from '@/stores/mainStore';

function ReviewSettings() {
  const { userData } = useMyPageStore((s) => ({
    userData: s.userData,
  }));

  const { setTrainerDetailPath } = mainStore((s) => ({
    setTrainerDetailPath: s.handleMethod.setTrainerDetailPath,
  }));

  useEffect(() => {
    if (userData) {
      setTrainerDetailPath('users');
    }
  }, [userData, setTrainerDetailPath]);

  return (
    <>
      <AppMeta title="리뷰 관리" description="리뷰 관리 페이지 입니다." />
      <AppHeader>리뷰 관리</AppHeader>

      <AppReviewList
        item={userData}
        filter={`user = '${userData.id}'`}
        expand={'gym, trainer'}
      />
    </>
  );
}

export default memo(ReviewSettings);
