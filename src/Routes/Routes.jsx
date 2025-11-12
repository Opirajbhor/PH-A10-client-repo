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
        element: <MyIssues></MyIssues>,
      },
      {
        path: "/addissue",
        element: <AddIssues></AddIssues>,
      },
      {
        path: "/mycontribution",
        element: <MyContribution></MyContribution>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      }
    ],
  },
]);

export default router;
