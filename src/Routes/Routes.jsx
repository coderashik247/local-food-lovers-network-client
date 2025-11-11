import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CardDetails from "../components/CardDetails/CardDetails";
import AllReviewsCard from "../components/ReviewsContainer/AllReviewCard/AllRecipesCard";
import About from "../components/about/about";
import Qna from "../components/QnaPage/Qna";
import MyRecipes from "../components/ReviewsContainer/MyReviews/MyReviews";
import PrivateRoute from "../components/routers/PrivateRoute";
import AddReview from "../components/AddElements/addrecipes/AddRecipes";

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
  {
    path: "/my-reviews",
    element: (
      <PrivateRoute>
        <MyRecipes />
      </PrivateRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/add-reviews",
    element: (
      <PrivateRoute>
        <AddReview />
      </PrivateRoute>
    ),
  },
  { path: "/all-reviews", element: <AllReviewsCard /> },
  {
    path: "/food-details/:id",
    element: (
      <PrivateRoute>
        <CardDetails />
      </PrivateRoute>
    ),
  },
]);
