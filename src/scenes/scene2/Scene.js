import { createRoot, unmount } from "react-dom/client";
import { useThree } from "@react-three/fiber";
import { Suspense, lazy } from "react";

import { CircleLoader } from "../../loaders/CircleLoader";

const App = lazy(() => import('./App'));
// import { App } from "./App";

const domRoot = document.getElementById("root");
var root = createRoot(domRoot);

const Scene = () => {
  root.render(
    <>
      <Suspense fallback={<CircleLoader />}>
        <App />
      </Suspense>
    </>,
  );
};

export const rebuildScene = (isNeedUnmount = false) => {
  if (isNeedUnmount) {
    root.unmount();
    root = createRoot(domRoot);
  }
  Scene();
};


export const CircleLoaderComponent = () => {
  return (
    <>
      <CircleLoader
        meshColor={"#6366F1"}
        lightColor={"#E0E7FF"}
        duration={1.5}
        desktopSize={"90px"}
        mobileSize={"64px"}
      />
    </>
  );
};

// const main = document.getElementById("main");

// const DomStruct = () => (
//   <div className="container">
//     <HamburgerButton />
//     <Sidebar />
//     <noscript>
//       You need to enable JavaScript to run this app.
//     </noscript>
//   </div>
// );

// const Dom = () => {
//   createRoot(main).render(
//     <>
//       <Suspense fallback={null}>
//         <DomStruct />
//       </Suspense>
//     </>,
//   );
// };

export const renderScene = () => {
  Scene();
  // Dom();
};