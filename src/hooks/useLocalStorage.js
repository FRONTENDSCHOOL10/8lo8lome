import { useCallback, useLayoutEffect, useState } from 'react';

const getLocalStorageData = (key) => {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setLocalStorageData = (key, value) => {
  if (typeof value !== 'function') {
    const saveData = JSON.stringify(value);
    window.localStorage.setItem(key, saveData);
  }
};

/** @type {(key: string, initialValue: any)} */
function useLocalStorage(key, initialValue, autoSave = false) {
  const [data, setData] = useState(() => getLocalStorageData(key));

  const saveData = useCallback(
    (value) => {
      setLocalStorageData(key, value);
    },
    [key]
  );

  useLayoutEffect(() => {
    if (autoSave) {
      saveData(key, data);
    }
  }, [key, autoSave, data, saveData]);

  return [data, setData, saveData];
}

export default useLocalStorage;
