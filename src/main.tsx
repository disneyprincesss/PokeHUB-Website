import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import HomePage from './pages/home'
import LibraryPage from "./pages/library";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import Book from "./components/book";

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
    element: <Book />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
