import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <>404 Not Found</>,
    }
])