import { createRoot, unmount } from "react-dom/client";
import { Suspense } from "react";
import { App } from "../App";

import { useThree } from "@react-three/fiber";

import { HamburgerButton } from "../Hamburger";
import { Sidebar } from "../Sidebar";

const domRoot = document.getElementById("root");
var root = createRoot(domRoot);

const Scene = () => {
  root.render(
    <>
      <Suspense fallback={null}>
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