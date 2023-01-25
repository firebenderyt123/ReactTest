import { useLocalStorage } from "./LocalStorage";

const defaultParams = {
  objectCount: 4,
  mass: 1
};

export const getParams = () => useLocalStorage("params", defaultParams);