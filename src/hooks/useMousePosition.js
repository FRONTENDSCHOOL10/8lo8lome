import { useState } from 'react';
import useEventListener from './useEventListener';

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEventListener(globalThis, 'mousemove', (e) => {
    setPosition({ x: e.pageX, y: e.pageY });
  });

  return position;
}

export default useMousePosition;
