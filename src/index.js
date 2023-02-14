import Burger from "./dom/Burger";
import Sidebar from "./dom/Sidebar";

import { Outlet } from "react-router-dom";
import { createRoot, unmount } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from "react";

import Loader from "./loaders/PuffLoader";
const App_1 = lazy(() => import('./scenes/scene1/App'));
const App_2 = lazy(() => import('./scenes/scene2/App'));
const App_3 = lazy(() => import('./scenes/scene3/App'));

import "./css/styles.css";

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <div className="container">
                <Burger />
                <Sidebar />
                <noscript>
                  You need to enable JavaScript to run this app.
                </noscript>
                <Outlet />
              </div>
            </>
          }>
            <Route index element={<App_1 />} />
            <Route path="balls" element={<App_1 />} />
            <Route path="heart" element={<App_2 />} />
            <Route path="robot" element={<App_3 />} />
            <Route path="*" element={<App_2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
