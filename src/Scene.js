import { createRoot, unmount } from "react-dom/client";
import { Suspense } from "react";
import { App } from "./App";

import { useThree } from "@react-three/fiber";

const domRoot = document.getElementById("root");
var root = createRoot(domRoot);

export const Scene = () => {
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