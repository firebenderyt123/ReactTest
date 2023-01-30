import { useLocalStorage, getStorageValue } from "../../LocalStorage";

const defaultParams = {
  objectCount: 4,
  mass: 1,

  gravityX: 0,
  gravityY: 2,
  gravityZ: 0
};

export const getParams = () => getStorageValue("params");
export const useParams = () => useLocalStorage("params", defaultParams);