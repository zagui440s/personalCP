import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from './pages/ContactPage';
import NotFoundPage from "./pages/NotFoundPage";
import YankeePage from "./pages/Yankee";


// const router = createHashRouter([
const router = createBrowserRouter([
    {
        // http://localhost:5173/
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'about/',
                element: <AboutPage />
            },
            {
                path: 'contact/',
                element: <ContactPage />
            },
            {
                path: 'yankee/',
                element: <YankeePage/>,
            },
            // {
            //     path:"*",
            //     element: <NotFountPage/>
            // }
        ],
        errorElement: <NotFoundPage />
    }
])

export default router;