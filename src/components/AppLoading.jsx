import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AppSpinner from '@/components/AppSpinner';
import { bool } from 'prop-types';

AppLoading.propTypes = {
  isLoading: bool,
};
export default function AppLoading({ isLoading }) {
  const [message, setMessage] = useState('로딩 중입니다 잠시만 기다려주세요.');

  useEffect(() => {
    if (isLoading) {
      setMessage('로딩 중입니다 잠시만 기다려주세요.');
    } else {
      setMessage('로딩이 완료되었습니다.');
    }
  }, [isLoading]);

  return (
    <>
      {isLoading &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-30 "
            aria-live="assertive"
            role="alert"
          >
            <div className="text-center">
              <AppSpinner size={50} duration={1.5} />
              <p className="sr-only">{message}</p>
            </div>
          </div>,
          document.querySelector('#loading-start') || document.body
        )}

      {!isLoading &&
        createPortal(
          <div>
            <p className="sr-only">{message}</p>
          </div>,
          document.querySelector('#loading-end') || document.body
        )}
    </>
  );
}
