import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';

function LocationMap() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  return (
    <section className="mx-s31">
      <h3 className="text-f18 font-bold mb-s10">위치</h3>
      <div className="w-s278 h-[10.875rem] bg-purple-300 rounded">
        지도 이미지
      </div>
    </section>
  );
}

export default memo(LocationMap);
