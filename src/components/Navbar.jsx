import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import image from "../assets/add.png";
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
    { name: "About", to: "/about" },
    { name: "Service", to: "/service" },
    { name: "Contact", to: "/contact" },
  ];




  useEffect(() => {
    // Assuming ConfingDatabase.getUserInfo returns a promise
    if (user) {
      ConfingDatabase.getUserInfo(user.$id)
        .then(async data => {
          setUserInfo(data)
          let userDp = await ConfingDatabase.getfilePrevie(data.coverPhoto)
          // console.log(userDp.href);
          setUserDp(userDp)
          // setUserDp(userDp);
        })
        .catch(error => console.error('Error fetching user info:', error));
    }

  }, []); // Empty dependency array means this effect will run once when the component mounts

  if (user) {
    navigateLinks.push({ name: "Profile", to: "/profile" });
    navigateLinks.push({ name: "Logout", to: "/login", onClick: logoutUser });
    // setUserInfo(ConfingDatabase.getUserInfo(user.$id))    
  }
  const PhoneMode = () => {
    setPhoneModeactiveClass((prevClass) => (prevClass === "hidden" ? "" : "hidden"));
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DEV-Platform</span>
          </Link>
          <form>
            <div style={{ width: 250 }} className="relative">
              <input onChange={text => { setSearch(text.target.value); }} value={search} type="search" id="default-search" className="block w-full  p-4 ps-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search App,news,update... " required />
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
                <img className="w-8 h-8 rounded-full" src={userDp} alt="user photo" />
              </button>

              {isDropdownOpen && (
                <div
                  style={{ top: '3rem', right: '1rem' }}
                  className="origin-top-right absolute w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                  <div className="py-1">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900">{userInfo.username}</span>
                      <span className="block text-sm text-gray-500 truncate">{userInfo.email}</span>
                    </div>
                  </div>
                  {/* Changing this into link */}
                  <NavLink to="/Dashboard" 
                  
                  className={({ isActive }) => {
                    return isActive
                      ? "block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100"
                      : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100";
                  }}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/profile" className={({ isActive }) => {
                    return isActive
                      ? "block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100"
                      : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100";
                  }}>
                    Profile
                  </NavLink>
                  <NavLink to="/Settings" className={({ isActive }) => {
                    return isActive
                      ? "block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100"
                      : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100";
                  }}>
                    Settings
                  </NavLink>
                  <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={logoutUser}>
                    Sign out
                  </NavLink>


                </div>

              )}
            </> : <>
              <Link to={"/login"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> Login</button>
              </Link>
              <Link to={"/register"}>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> register</button>
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
            <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              {navigateLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={link.onClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0";
                  }}
                  aria-current={link.name}
                >
                  {link.name === "Logout" ? (
                    <button className="cursor-pointer" onClick={link.onClick}>
                      {link.name}
                    </button>
                  ) : (
                    <div>{link.name}</div>
                  )}
                </NavLink>
              ))}
              {/* <button
                type="button"
                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-center"
              > */}
              <img width={24} className="hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer" src={image} alt="Create" />
              {/* Create
              </button> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
