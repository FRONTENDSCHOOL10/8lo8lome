import { useDebugValue, useState } from 'react';
import useEventListener from './useEventListener';

function useOnline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useDebugValue(isOnline, () => (isOnline ? '온라인' : '오프라인'));

  useEventListener(globalThis, 'online', () => setIsOnline(true));
  useEventListener(globalThis, 'offline', () => setIsOnline(false));

  return isOnline;
}

export default useOnline;
