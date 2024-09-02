import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppSpinner } from '@/components';

function RootLayout() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center flex-col text-white">
      <main className="min-w-[320px] max-w-[320px] relative border border-solid border-white box-border">
        <Suspense fallback={<AppSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default RootLayout;
