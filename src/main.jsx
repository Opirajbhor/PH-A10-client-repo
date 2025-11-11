import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./App.jsx";
import router from "./Routes/Routes.jsx";

// Import Flowbite
import 'flowbite'
import { initFlowbite } from 'flowbite'

// Initialize Flowbite
initFlowbite()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
