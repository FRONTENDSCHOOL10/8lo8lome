/**@type {(key: string, initialValue?: any, storageType: 'local' | 'session') => any} */
export function getStorageData(
  key,
  initialValue = null,
  storageType = 'local'
) {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  const data = storage.getItem(key);
  return data ? JSON.parse(data) : initialValue;
}

/**@type {(key: string, value: any, storageType: 'local' | 'session') => void} */
export function setStorageData(key, value, storageType = 'local') {
  const storage = storageType === 'local' ? localStorage : sessionStorage;
  storage.setItem(key, JSON.stringify(value));
}
