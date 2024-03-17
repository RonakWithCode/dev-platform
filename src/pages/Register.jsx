import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import '../css/auth.css';

const Register = () => {
  // const registerForm = useRef(null);
  // const { registerUser } = useAuth();
  // const [passwordVisible, setPasswordVisible] = useState(false);

  const registerForm = useRef(null);
  const { registerUser } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm.current);
    const userInfo = Object.fromEntries(formData.entries());
    
    if (userInfo.password1 !== userInfo.password2) {
      alert('Passwords did not match!');
      return;
    }

    if (!profilePicture) {
      alert('Please upload a profile picture!');
      return;
    }

    console.log(userInfo);

    console.log(profilePicture);
    registerUser(userInfo, profilePicture);
  };


  return (
    <div className="centered-container">
      <form className="centered-form" ref={registerForm} onSubmit={handleFormSubmit}>
        <div className="space-y-12">
          {/* Profile Section */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Username */}
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>
              {/* About */}
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
              </div>
              {/* Photo */}
              <div className="sm:col-span-4">
              <div className="mt-2 flex items-center gap-x-3">
                  {profilePicture ? (
                    <img src={URL.createObjectURL(profilePicture)} className="h-12 w-12 rounded-full" alt="Profile" />
                  ) : (
                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                  )}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      id="fileUpload"
                      name="fileUpload"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                    <span className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Change
                    </span>
                  </label>
                </div>
        


              </div>

            </div>
          </div>

          {/* Personal Information Section */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* First Name */}
              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Last Name */}
              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Email Address */}
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="sm:col-span-3 relative">
                <label htmlFor="password1" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2 relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password1"
                    id="password1"
                    autoComplete="new-password"
                    className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <img
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
                    width={20}
                    src={passwordVisible ? 'src\\assets\\show.png' : 'src\\assets\\hide.png'}
                    alt={passwordVisible ? 'Show Password' : 'Hide Password'}
                  />
                </div>
              </div>
              {/* Confirm Password */}
              <div className="sm:col-span-3 relative">
                <label htmlFor="password2" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2 relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password2"
                    id="password2"
                    autoComplete="new-password"
                    className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <img
                    onClick={togglePasswordVisibility}
                    className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
                    width={20}
                    src={passwordVisible ? 'src\\assets\\show.png' : 'src\\assets\\hide.png'}
                    alt={passwordVisible ? 'Show Password' : 'Hide Password'}
                  />
                </div>
              </div>
              {/* Country */}
              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>India</option>
                  </select>
                </div>
              </div>
              {/* Street Address */}
              <div className="col-span-full">
                <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* City */}
              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* State / Province */}
              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* ZIP / Postal Code */}
              <div className="sm:col-span-2">
                <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring
                    -inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
  
         
  
            {/* Form Submission Buttons */}
            <div className="mt-6 flex items-center justify-center">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Save
              </button>
            </div>
            <Link className='mt-6 flex items-center justify-center' to={"/login"} variant="body2">
              {"have an account? Log in"}
            </Link>
          </div>
        </form>
      </div>
    );
  };
  
  export default Register;
  
