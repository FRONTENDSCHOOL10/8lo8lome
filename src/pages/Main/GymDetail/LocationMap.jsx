import { memo } from 'react';
import { mainStore } from '@/stores/mainStore';

function LocationMap() {
  const { gymData } = mainStore((s) => ({
    gymData: s.searchInput.gymData,
  }));

  return (
    <section className="mx-s31">
      <h3 className="text-f18 font-bold mb-s10">위치</h3>
      <div
        id="map"
        className="w-s278 h-[10.875rem] bg-purple-300 rounded"
      ></div>
    </section>
  );
}

export default memo(LocationMap);
