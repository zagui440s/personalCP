import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AllTasksPage from "./pages/AllTasksPage";
import EditTaskPage from "./pages/EditTaskPage";
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage'
import { getAllTasks, getInfo, getATask } from "./utilities";

const router = createBrowserRouter([{
    path:'/',
    loader: getInfo,
    element: <App/>,
    children: [
        {
            index: true,
            element: <HomePage/>
        },
        {
            path:"tasks/",
            loader: getAllTasks,
            element:<AllTasksPage/>,
        },
        {
            path:"login/",
            element:<LogInPage/>
        },
        {
            path:"edit/:id/",
            loader:async({params})=>{
                const {id} = params
                return getATask(id)
            },
            element:<EditTaskPage/>
        },
        {
            path:"*",
            element:<NotFoundPage/>
        }
    ],
    errorElement: <ErrorPage />
}]);

export default router;