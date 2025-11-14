import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/config.firebase";

const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  const { displayName, email, photoURL } = currentUser;

  // logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      window.location.reload()
    } catch (error) {
    }
  };

  // night mood
  const [isEnable, setIsEnable] = useState("light");
  const [modeIcon, setModeIcon] = useState(<MdDarkMode />);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isEnable);
  }, [isEnable]);

  const theme = () => {
    if (isEnable === "light") {
      setIsEnable("dark");
      setModeIcon(<MdDarkMode />);
    }
    if (isEnable === "dark") {
      setIsEnable("light");
      setModeIcon(<MdOutlineWbSunny />);
    }
  };
  // ---------------

  const noUserLinks = (
    <div className="lg:flex lg:flex-row flex-col items-center justify-between gap-5 mr-8">
      <Link to="/">Home</Link>
      <Link to="/allissues">All Issues</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
  const UserLinks = (
    <div className="lg:flex lg:flex-row flex-col items-center justify-between gap-5 mr-8">
      <Link to="/">Home</Link>
      <Link to="/allissues">All Issues</Link>
      <Link to="/addissue">Add Issues</Link>
      <Link to="/myissues">My Issues</Link>
      <Link to="/mycontribution">My Contribution</Link>
      {/* button avatar */}
      <div className="dropdown dropdown-end ">
        <div
          tabIndex={1}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={photoURL ? photoURL : <CgProfile />}
            />
          </div>
        </div>
        <ul
          tabIndex="1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link to="/profile" className="justify-between">Profile</Link>
          </li>

          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="navbar flex items-center mb-10 justify-between bg-base-100 shadow-sm">
      {/* logo */}
      <div>
        <Link to="/" className="text-3xl font-bold text-green-500">
          Trackify
        </Link>
      </div>
      <div className="flex items-center justify-center ">
        {/* links */}
        <div className="hidden lg:flex items-center justify-center">
          {currentUser ? UserLinks : noUserLinks}
          <div onClick={theme} className="mr-5 text-2xl cursor-pointer">
            {modeIcon}
          </div>
        </div>

        {/* hambarger menu */}
        <div className="dropdown md:hidden lg:hidden dropdown-end ">
          <div tabIndex={0} role="button" className="btn btn-ghost  avatar">
            <div className="w-auto md:hidden lg:hidden ">
              <GiHamburgerMenu />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className=" flex flex-col flex-wrap gap-20 menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow"
          >
            {currentUser ? UserLinks : noUserLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
