import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/config.firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router";
import { SyncLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false)
      }
    });
    return()=> unsubscribe;
  }, []);
  if(loading) return <SyncLoader />
  console.log("current", currentUser);
  if (currentUser) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
