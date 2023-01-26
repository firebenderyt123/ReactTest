import { useLocalStorage, getStorageValue } from "./LocalStorage";

const defaultParams = {
  objectCount: 4,
  mass: 1
};

export const getParams = () => getStorageValue("params");
export const useParams = () => useLocalStorage("params", defaultParams);