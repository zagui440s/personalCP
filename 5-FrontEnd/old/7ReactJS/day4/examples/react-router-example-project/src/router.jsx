import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactUsPage from "./components/ContactUsPage";
import UserPage, { userImageLoader } from "./components/UserPage";
import Error404Page from "./components/Error404Page";

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
      {
        path: "users/:userId",
        element: <UserPage />,
        loader: userImageLoader,
      },
    ],
    errorElement: <Error404Page />,
  },
]);

export default router;
