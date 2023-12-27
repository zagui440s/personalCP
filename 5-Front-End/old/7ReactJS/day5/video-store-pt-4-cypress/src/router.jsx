import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import FilmPage from "./components/FilmPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/film/:filmId",
        element: <FilmPage />,
      },
    ],
  },
]);

export default router;
