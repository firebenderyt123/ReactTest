import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import { App } from "./App";

const root = createRoot(document.getElementById("root"));

export const Scene = () => {
  root.render(
    <>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </>,
  );
};

export const removeScene = () => {
  while (root.firstChild) {
    root.removeChild(root.lastChild);
  }
};

export const rebuildScene = () => {
  // root.unmount();
  Scene();
};