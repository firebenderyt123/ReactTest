import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import { App } from "./App";

const root = createRoot(document.getElementById("root"));

export const Scene = (props) => {
  if (props == null) {
    props = {
      clumpProps: null
    }
  }
  root.render(
    <>
      <Suspense fallback={null}>
        <App {...props} />
      </Suspense>
    </>,
  );
};

export const removeScene = () => {
  while (root.firstChild) {
    root.removeChild(root.lastChild);
  }
};

export const rebuildScene = (props) => {
  // root.unmount();
  Scene(props);
};