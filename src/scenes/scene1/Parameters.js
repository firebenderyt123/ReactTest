import { useLocalStorage, getStorageValue } from "../../LocalStorage";

const defaultParams = {
  min: {
    objectCount: 1,
    mass: 1,

    gravityX: -100,
    gravityY: -100,
    gravityZ: -100
  },
  max: {
    objectCount: 100,
    mass: 99,

    gravityX: 100,
    gravityY: 100,
    gravityZ: 100
  },
  step: {
    objectCount: 1,
    mass: 1,
    
    gravityX: 1,
    gravityY: 1,
    gravityZ: 1
  },
  maxLength: {
    objectCount: 3,
    mass: 2,
    
    gravityX: 4,
    gravityY: 4,
    gravityZ: 4
  },
  value: {
    objectCount: 4,
    mass: 1,

    gravityX: 0,
    gravityY: 2,
    gravityZ: 0
  }
};

export const getParams = () => getStorageValue("Scene1_Params");
export const useParams = (params = defaultParams) => useLocalStorage("Scene1_Params", params);