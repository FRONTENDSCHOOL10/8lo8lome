import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppSpinner } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getStorageData } from '@/utils';

function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginStatus = getStorageData('autoLogin');
    if (storedLoginStatus) {
      navigate('/main');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-mainBg flex justify-center items-center flex-col text-white">
      <main className="min-w-[320px] max-w-[320px] relative border border-solid border-white box-border">
        <Suspense fallback={<AppSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default RootLayout;
