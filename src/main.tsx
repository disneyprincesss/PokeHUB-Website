import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LibraryPage from "./pages/library";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import BattlePage from "./pages/battle";

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/library",
    element: <LibraryPage />,
  },
  {
    path: "/battle",
    element: <BattlePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
