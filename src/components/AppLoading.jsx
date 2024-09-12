import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AppSpinner from './AppSpinner';

const alarm = [
  {
    id: 1,
    notification: '로딩 중입니다.',
  },
  {
    id: 2,
    notification: '로딩이 끝났습니다.',
  },
];

export default function AppLoading() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(alarm[0].notification);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setMessage(alarm[1].notification);
    }, 3000); //3초후 로딩 종료
    return () => clearTimeout(timer);
  }, []);

  // const loadingStart = document.querySelector('#loading-start');
  // const loadingEnd = document.querySelector('#loading-end');

  return (
    <>
      {loading &&
        createPortal(
          <div className="fixed inset-y-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-50">
            <AppSpinner size={50} duration={1.5} />
            <p>{message}</p>
          </div>,
          document.body
        )}
      {!loading && <p>{message}</p>}
    </>
  );
}
