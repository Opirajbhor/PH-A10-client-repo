import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/config.firebase.js";

// current user

const HomeLayout = () => {
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);
  return (
    <div>
      <Navbar currentUser={currentUser}></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
