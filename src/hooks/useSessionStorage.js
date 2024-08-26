import { useCallback, useLayoutEffect, useState } from 'react';

const getSessionStorageData = (key) => {
  const data = window.sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setSessionStorageData = (key, value) => {
  if (typeof value !== 'function') {
    const saveData = JSON.stringify(value);
    window.sessionStorage.setItem(key, saveData);
  }
};

/** @type {(key: string, initialValue: any)} */
function useSessionStorage(key, initialValue, autoSave = false) {
  const [data, setData] = useState(() => getSessionStorageData(key));

  const saveData = useCallback(
    (value) => {
      setSessionStorageData(key, value);
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

export default useSessionStorage;
