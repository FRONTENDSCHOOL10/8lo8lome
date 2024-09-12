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
    <div className="min-h-screen bg-mainBg flex flex-col text-white font-pretendard">
      <div className="relative box-border overflow-auto custom-scrollbar">
        {/* 반응형처럼 보이게 하려면 w-full 추가해야할듯.. */}
        <Suspense fallback={<AppSpinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default RootLayout;
