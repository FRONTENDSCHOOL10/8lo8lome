import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppSpinner } from '@/components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getStorageData, removeStorageData } from '@/utils';

function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = getStorageData('autoLogin');
    const pocketbaseAuth = getStorageData('pocketbase_auth');

    if (autoLogin && pocketbaseAuth) {
      navigate('/main');
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const autoLogin = getStorageData('autoLogin');

      if (!autoLogin) {
        removeStorageData('pocketbase_auth');
        removeStorageData('autoLogin');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen bg-mainBg flex flex-col text-white font-pretendard">
      <div className="relative box-border overflow-auto custom-scrollbar">
        <Suspense fallback={<AppSpinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default RootLayout;
