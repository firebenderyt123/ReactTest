import { createRoot, unmount } from "react-dom/client";
import { Suspense, lazy } from "react";

import { useThree } from "@react-three/fiber";

import { CircleLoader } from "../../loaders/CircleLoader";
import HamburgerButton from "./Hamburger";
import Sidebar from "./Sidebar";

const App = lazy(() => import('./App'));

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


const main = document.getElementById("main");

const DomStruct = () => (
  <div className="container">
    <HamburgerButton />
    <Sidebar />
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
  </div>
);

const Dom = () => {
  createRoot(main).render(
    <>
      <Suspense fallback={null}>
        <DomStruct />
      </Suspense>
    </>,
  );
};

export const renderScene = () => {
  Scene();
  Dom();
};