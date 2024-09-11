import AppMeta from '@/components/AppMeta';
import { AppHeader } from '@/components';
import Rating from './Rating.jsx';
import HealthPrice from './HealthPrice.jsx';
import PtPrice from './PtPrice.jsx';
import Amenities from './Amenities.jsx';
import TrainerCount from './TrainerCount.jsx';
import TrainerInfo from './TrainerInfo.jsx';
import Counselor from './Counselor.jsx';
import AgeGroup from './AgeGroup.jsx';
import { memo } from 'react';

function Filter() {
  return (
    <>
      <AppHeader>필터</AppHeader>
      <AppMeta title="검색 필터 페이지" description="검색 필터 페이지입니다." />

      <Rating />
      <HealthPrice />
      <PtPrice />
      <Amenities />
      <TrainerCount />
      <TrainerInfo />
      <Counselor />
      <AgeGroup />
    </>
  );
}

export default memo(Filter);
