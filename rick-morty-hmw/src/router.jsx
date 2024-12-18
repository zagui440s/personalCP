import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailsPage from "./pages/CharacterDetailsPage";
import FavoriteCharactersPage from "./pages/FavoriteCharactersPage";

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
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "characters",
        element: <CharactersPage />,
      },
      { 
        path: "characters/:characterId", 
        element: <CharacterDetailsPage />,
      },
      {
        path: "favorites",
        element: <FavoriteCharactersPage/>,
      },
    ],
  },
]);

export default router;
