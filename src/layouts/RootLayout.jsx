import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';

function RootLayout() {
  return (
    <main className="h-screen bg-black flex justify-center items-center flex-col text-white">
      <Link to="/" className="absolute top-10 left-10">
        시작페이지
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
}

export default RootLayout;
