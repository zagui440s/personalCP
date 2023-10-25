import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactUsPage from "./components/ContactUsPage";

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
        path: "contact-us",
        element: <ContactUsPage />,
      },
    ],
  },
]);

export default router;
