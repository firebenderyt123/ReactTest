import { useState, useEffect } from "react";
import { ARButton } from '@react-three/xr';

import Scene3D from './Scene3D';
import AR from './AR';

import Test from './Test';

const App = () => {
  const [container, setContainer] = useState(null);
  const [loadScene, setLoadScene] = useState(<Scene3D />);

  useEffect(() => {
    setContainer(document.getElementById("root").getElementsByClassName("container")[0]);
  });

  const XRStart = (event) => {
    setLoadScene(<AR />);
    container.classList.add("XR-mode");
  };

  const XRStop = (event) => {
    setLoadScene(<Scene3D />);
    container.classList.remove("XR-mode");
  };

  // return (
  //   <Test />
  // );

  return (
    <>
      <ARButton className="AR-btn">
        {
          (status) => status == "unsupported"
          ? <div className="XR-start">AR is unsupported</div>
          : status == "exited"
            ? <><div className="XR-start" onClick={XRStart}>Try AR</div></>
            : <><div className="XR-stop" onClick={XRStop}>Exit</div></>
        }
      </ARButton>
      {loadScene}
    </>
  );
};

export default App;