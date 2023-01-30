import { CircleLoader as CL } from "../models/CircleLoader";

export const CircleLoader = () => (
  <CL
    className="loader"
    meshColor={"#6366F1"}
    lightColor={"#FFFFFF"}
    backgroundColor={"#E0E7FF"}
    desktopSize={"128px"}
    mobileSize={"64px"}
  />
);
