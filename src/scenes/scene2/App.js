import { Suspense, lazy, useState, useEffect } from "react";
import { ARButton } from '@react-three/xr';

import { CircleLoader } from "../../loaders/CircleLoader";

const Scene3D = lazy(() => import('./Scene3D'));
const AR = lazy(() => import('./AR'));

const App = () => {
  const [container, setContainer] = useState(null);
  const [loadScene, setLoadScene] = useState(<Scene2D />);

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

  return (
    <>
      <Suspense fallback={<CircleLoader />}>
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
      </Suspense>
    </>
  );
};

export default App;