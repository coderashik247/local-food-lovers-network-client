import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CardDetails from "../components/CardDetails/CardDetails";
import AllReviewsCard from "../components/ReviewsContainer/AllReviewCard/AllRecipesCard";
import AddRecipe from "../components/AddElements/addrecipes/AddRecipes";
import About from "../components/about/about";
import Qna from "../components/QnaPage/Qna";
import MyRecipes from "../components/ReviewsContainer/MyReviews/MyReviews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/about", element: <About /> },
  { path: "/faq", element: <Qna /> },
  { path: "/my-reviews", element: <MyRecipes /> },
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
    path: "/food-details/:id",
    element: <CardDetails />,
  },
]);
