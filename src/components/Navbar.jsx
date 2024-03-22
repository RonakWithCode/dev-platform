import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import add_icon from "../assets/SVG/Icon/add-icon.svg";
import ConfingDatabase from "../utils/ConfingDatabase"

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const [PhoneModeactiveClass, setPhoneModeactiveClass] = useState("hidden");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [userInfo, setUserInfo] = useState(null);
  const [userDp, setUserDp] = useState(null);

  const navigateLinks = [
    { name: "Home", to: "/" },
    { name: "Project", to: "/project" },
    { name: "About", to: "/about" },
    { name: "Service", to: "/service" },
    { name: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    if (user) {
      ConfingDatabase.getUserInfo(user.$id)
        .then(async data => {
          setUserInfo(data)
          // let userDp = await ConfingDatabase.getfilePrevie(data.DP)
          // setUserDp(userDp)
        })
        .catch(error => console.error('Error fetching user info:', error));
    }
  }, []);

  if (user) {
    navigateLinks.push({ name: "Profile", to: "/profile" });
  }

  const PhoneMode = () => {
    setPhoneModeactiveClass((prevClass) => (prevClass === "hidden" ? "" : "hidden"));
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">social-media-content-maker</span>
          </Link>
          <form>
            <div style={{ width: 250 }} className="relative">
              <input onChange={text => { setSearch(text.target.value); }} value={search} type="search" id="default-search" className="block w-full  p-4 ps-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-gray-600 dark:focus:border-gray-600 focus:ring-opacity-50 dark:focus:ring-opacity-50" placeholder="Search App, news, update..." required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
          </form>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user ? <>
              <button
                onClick={toggleDropdown}
                type="button"
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={add_icon} alt="user photo" />
              </button>

              {isDropdownOpen && (
                <div
                  style={{ top: '3rem', right: '1rem' }}
                  className="origin-top-right absolute w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                  <div className="py-1">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">{userInfo.Fullname}</span>
                      <span className="block text-sm text-gray-500 truncate dark:text-white">{userInfo.email}</span>
                    </div>
                  </div>
                  <NavLink to="/Dashboard"
                    className={({ isActive }) => {
                      return isActive
                        ? "block px-4 py-2 text-sm text-blue-700 dark:text-white  dark:hover:bg-gray-500"
                        : "block px-4 py-2 text-sm text-gray-700 dark:text-white dark:hover:bg-gray-500";
                    }}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/profile" className={({ isActive }) => {
                    return isActive
                      ? "block px-4 py-2 text-sm text-blue-700 dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-500"
                      : "block px-4 py-2 text-sm text-gray-700 dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-500";
                  }}>
                    Profile
                  </NavLink>
                  <NavLink to="/Settings" className={({ isActive }) => {
                    return isActive
                      ? "block px-4 py-2 text-sm text-blue-700 dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-500"
                      : "block px-4 py-2 text-sm text-gray-700 dark:text-white   hover:bg-gray-100 dark:hover:bg-gray-500";
                  }}>
                    Settings
                  </NavLink>
                  <NavLink to="#" className="block px-4 py-2 text-sm dark:text-white text-gray-700   hover:bg-gray-100 dark:hover:bg-gray-500"
                    onClick={logoutUser}>
                    Sign out
                  </NavLink>
                </div>
              )}
            </> : <>
            <Link to={"/login"}>
                  <button className="text-black bg-white dark:bg-gray-900 hover:bg-gray-900 dark:text-white hover:text-white font-bold py-2 px-4  rounded-xl">Login</button>
              </Link>
              <Link to={"/register"}>

                <button className="text-white bg-gray-700 dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-400 dark:text-black font-bold py-2 px-4  rounded-xl">Register</button>
              </Link>

            </>}

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              onClick={PhoneMode}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className={`items-center justify-between ${PhoneModeactiveClass} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
            <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              {navigateLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={link.onClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:text-white"
                      : "block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  dark:text-white";
                  }}
                  aria-current={link.name}
                >
                  <div>{link.name}</div>
 
                </NavLink>
              ))}
              <Link to={"/new"}>
                <img width={24} className="hover:bg-gray-100 dark:hover:bg-gray-600  cursor-pointer" src={add_icon} alt="Create new APP" />
              </Link>
              
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};



export default Navbar;