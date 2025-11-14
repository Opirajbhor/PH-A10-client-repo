import React from "react";
import { createBrowserRouter, Routes } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import HomePage from "../Pages/HomePage";
import Allissues from "../Pages/Allissues";
import Error from "../Components/Error";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyIssues from "../Pages/MyIssues";
import AddIssues from "../Pages/AddIssues";
import MyContribution from "../Pages/MyContribution";
import Profile from "../Pages/Profile";
import PrivateRoute from "./PrivateRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "/allissues",
        element: <Allissues></Allissues>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/myissues",
        element: <PrivateRoute><MyIssues></MyIssues></PrivateRoute> ,
      },
      {
        path: "/addissue",
        element: <PrivateRoute><AddIssues></AddIssues></PrivateRoute> ,
      },
      {
        path: "/mycontribution",
        element: <PrivateRoute><MyContribution></MyContribution></PrivateRoute>,
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      }
    ],
  },
]);

export default router;
