import { createRoot } from "react-dom/client";
import { Suspense } from "react";

import { HamburgerButton } from "./Hamburger";
import { Sidebar } from "./Sidebar";

const root = document.getElementById("main");

const DomStruct = () => (
  <div className="container">
    <HamburgerButton />
    <Sidebar />
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
  </div>
);

export const Dom = () => {
  createRoot(root).render(
    <>
      <Suspense fallback={null}>
        <DomStruct />
      </Suspense>
    </>,
  );
};

export const removeDom = () => {
  while (root.firstChild) {
    root.removeChild(root.lastChild);
  }
};