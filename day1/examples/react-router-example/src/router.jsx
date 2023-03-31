import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ErrorPage from "./components/ErrorPage";
import PokeViewer, { pokeLoader } from "./components/PokeViewer";

const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "pokemon/:pokeId",
                element: <PokeViewer />,
                loader: pokeLoader
            }
        ]
    }
]);

export default router;