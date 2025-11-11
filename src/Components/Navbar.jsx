import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";

const Navbar = () => {
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

  const links = (
    <div className="lg:flex lg:flex-row flex-col items-center justify-between gap-5 mr-8">
      <Link>Home</Link>
      <Link>All Issues</Link>
      <Link to="/login">Login</Link>
      <Link to='/register'>Register</Link>
    </div>
  );

  return (
    <div className="navbar flex items-center justify-between bg-base-100 shadow-sm">
      {/* logo */}
      <div>
        <Link to="/" className="text-3xl font-bold text-green-500">
          Trackify
        </Link>
      </div>
      <div className="flex items-center justify-center ">
        {/* links */}
        <div className="hidden lg:flex items-center justify-center">
          {links}
          <div onClick={theme} className="mr-5 text-2xl cursor-pointer">
            {modeIcon}
          </div>
        </div>

        {/* button avatar */}
        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>

            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>

        {/* hambarger menu */}
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button" className="btn btn-ghost  avatar">
            <div className="w-auto md:hidden lg:hidden ">
              <GiHamburgerMenu />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
