import { useSyncExternalStore } from 'react';

function useEventListener(target, eventType, eventHandler) {
  useSyncExternalStore(
    () => {
      target.addEventListener(eventType, eventHandler);

      return () => {
        target.removeEventListener(eventType, eventHandler);
      };
    },
    () => undefined
  );
}

export default useEventListener;
