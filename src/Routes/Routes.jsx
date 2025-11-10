import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CardDetails from "../components/CardDetails/CardDetails";
import AllReviewsCard from "../components/ReviewsContainer/ReviewCard/AllReviewsCard";
import AddRecipe from "../components/AddElements/addrecipes/AddRecipes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/add-recipes", element: <AddRecipe /> },
  {
    path: "all-food",
    element: <AllReviewsCard />,
  },
  {
    path: "/food-details/:productId",
    element: <CardDetails />,
  },
]);
