import React from 'react';
import { createBrowserRouter, Routes } from 'react-router';
import HomeLayout from '../Layout/HomeLayout';
import HomePage from '../Pages/HomePage';
import Allissues from '../Pages/Allissues';
import Error from '../Components/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children:[
      {
        index: true,
        element: <HomePage></HomePage>
      },
      {
        path : "/allissues",
        element: <Allissues></Allissues>
      }
    ],
  },
]);

export default router;