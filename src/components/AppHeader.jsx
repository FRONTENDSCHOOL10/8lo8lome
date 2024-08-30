import { memo } from 'react';

function AppHeader() {
  return (
    <header className="flex justify-center py-3 bg-black ">
      <h1 className="text-white">로고 영역</h1>
    </header>
  );
}

export default memo(AppHeader);
