import { useState, useEffect } from 'react';

function useStateWithCallback(initivalValue, callback) {
  const [state, setState] = useState(initivalValue);

  useEffect(() => {
    callback?.(state);
  }, [state, callback]);

  return [state, setState];
}

export default useStateWithCallback;
