'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Header() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { username?: string; password?: string } = {};

    if (!username) {
      newErrors.username = '(*) Username is required';
    }
    if (!password) {
      newErrors.password = '(*) Password is required';
    }
    setErrors(newErrors);
  };

  return (
    <div className="h-18  w-full bg-blue-100">
      <div className="flex justify-between items-center mx-5 py-2">
        <Link href={"/"} className=" font-extrabold text-5xl ml-10 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-500">
          Library
        </Link>
        <div className="flex items-center gap-3 w-1/3">
          <form className="flex-1">
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only "
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
          {/* <button type="button" className="text-white bg-blue-800 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Log in / Sign up</button> */}
          <button
            data-modal-target="login-modal"
            data-modal-toggle="login-modal"
            className="text-white bg-blue-700 font-normal hover:bg-blue-800 rounded-lg px-5 py-2"
            onClick={() => setOpenModal(true)}
          >
            Log in / Sign up
          </button>
          <LoginModal open={openModal} onClose={() => setOpenModal(false)}>
            <div className="flex">
              <img src="LoginImage.jpg" alt="login image" width={'60%'} />
              <div className="py-4 flex-1">
                <div className="text-3xl w-full text-center text-blue-800">
                  {isSignUp
                    ? 'Create your account!'
                    : 'Welcome to our library !'}
                </div>
                <div className="flex flex-col mt-5 px-4">
                  <form>
                    <div className="flex flex-col mb-3">
                      <label
                        htmlFor="username"
                        className={`mb-1 font-medium text-base ${errors.username ? 'text-red-500' : 'text-gray-500'}`}
                      >
                        Username
                      </label>
                      <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`border  ${errors.username ? 'border-red-500' : 'border-gray-300'}  px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition duration-200`}
                        placeholder="Enter your username..."
                      />
                      <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.username}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="password"
                        className={`mb-1 font-medium text-base ${errors.username ? 'text-red-500' : 'text-gray-500'}`}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={` border ${errors.password ? 'border-red-500' : 'border-gray-300'}  px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition duration-200`}
                        placeholder="Enter your password..."
                      />
                      <span className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.password}
                      </span>
                    </div>
                    {isSignUp ? (
                      <p className=" text-lg mt-2">
                        Already have an account ?{' '}
                        <a
                          href="#"
                          onClick={() => setIsSignUp(false)}
                          className="text-blue-500 hover:text-blue-800 transition duration-100"
                        >
                          Log in
                        </a>
                      </p>
                    ) : (
                      <p className=" text-lg mt-2">
                        Doesn&apos;t have an account ?{' '}
                        <a
                          href="#"
                          onClick={() => setIsSignUp(true)}
                          className="text-blue-500 hover:text-blue-800 transition duration-100"
                        >
                          Sign up
                        </a>
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                      className="w-full bg-blue-600 text-white px-3 py-3 text-lg transition duration-100 rounded-lg mt-10 hover:bg-blue-800 font-thin"
                    >
                      {isSignUp ? 'Sign up' : 'Log in'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </LoginModal>
        </div>
      </div>
    </div>
  );
}

interface LoginProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const LoginModal: React.FC<LoginProps> = ({ open, onClose, children }) => {
  return (
    <div
      //   onClick={onClose}
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={` w-2/3 bg-white shadow rounded-xl p-6  transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
      >
        <button
          onClick={onClose}
          className=" text-lg absolute top-3 right-5 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        {children}
      </div>
    </div>
  );
};
