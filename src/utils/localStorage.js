export const LOCAL_STORAGE_KEY = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  PERMISSIONS: "permissions",
  USER_INFO: "userInfo"
};

export function getValueFromStorageByKey(key) {
  const token = localStorage.getItem(key);
  if (token && token !== `undefined`) {
    return JSON.parse(token);
  }
  return null;
}

export function setValueToStorageByKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeValueToStorageByKey(key) {
  localStorage.removeItem(key);
}

export function clearAll() {
  localStorage.clear();
}
