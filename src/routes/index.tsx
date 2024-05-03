import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import ErrorPage from "../pages/ErrorPage";
import FeedPage from "../pages/FeedPage";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: "search", element: <SearchPage /> }
    ]
  }
]);

export default router;
