import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import PokeViewer from "./components/PokeViewer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/about",
        element: <AboutPage />,
    },
    {
        path: "/pokemon/:pokeId",
        element: <PokeViewer />,
    },
]);

export default router;