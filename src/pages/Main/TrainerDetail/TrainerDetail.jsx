import AppMeta from '@/components/AppMeta';
import { AppHeader } from '@/components';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

function TrainerDetail() {
  const { trainerId } = useParams();

  return (
    <>
      <AppHeader>리뷰</AppHeader>
      <AppMeta
        title="트레이너 정보 페이지"
        description="트레이너 정보 페이지입니다."
      />
      <h1 className="ml-s31 mt-[100px]">트레이너 정보 페이지입니다.</h1>
      <h2>{trainerId}</h2>
    </>
  );
}

export default memo(TrainerDetail);
