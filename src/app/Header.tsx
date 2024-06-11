'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Alert from './Alert';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './GlobalRedux/store';
import { addBook } from './GlobalRedux/Features/Books/booksSlice';

interface CustomJwtPayload extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  'user-details': {
    username: string;
    roles: string[];
  };
  userId: number;
}

interface Book {
  category: {
    id: number;
    name: string;
  };
  id: number;
  name: string;
  quantity: number;
}

type AlertType = 'info' | 'success' | 'fail';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isAddBook, setIsAddBook] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [accessToken, setAccesstoken] = useState<string>('');
  const [isOpenUser, setIsOpenUser] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  const [tokenUN, setTokenUN] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [role, setRole] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [alertType, setAlertType] = useState<AlertType>('info');

  const [newBookName, setNewBookName] = useState<string>('');
  const [newCatID, setNewCatID] = useState<number>(0);

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const alert = (type: AlertType, title: string, subtitle: string) => {
    setTitle(title);
    setSubtitle(subtitle);
    setAlertType(type);
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setAccesstoken(token);
      const decoded = jwtDecode<CustomJwtPayload>(token);
      // console.log(decoded['user-details'].roles[0]);
      // setRole(decoded['user-details'].roles[0]); // uncomment this after testing
      setTokenUN(decoded['user-details'].username);
      setUserId(decoded.userId);
      setRole(decoded['user-details'].roles[0]);
    }
  }, []);

  const clearUserInput = () => {
    setPassword('');
    setUsername('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { username?: string; password?: string } = {};

    if (!username) {
      newErrors.username = '(*) Username is required';
    } else if (/\s/.test(username) && isSignUp) {
      newErrors.username = '(*) Username cannot contain spaces';
    }
    if (!password) {
      newErrors.password = '(*) Password is required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const body = {
        username: username.trim(),
        password: password,
      };
      if (isSignUp) {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/auth/register',
            body
          );
          clearUserInput();
          setSignUpSuccess(true);
          setIsSignUp(false);

          // console.log(response.data);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (
              error.response.status === 400 &&
              error.response.data.message === 'Username is already taken!'
            ) {
              setErrors({ username: '(*) Username is already taken !' });
            } else {
              console.log('Unexpected errors: ', error.response.data);
            }
          }
        }
        return;
      } else {
        try {
          const response = await axios.post(
            'http://localhost:8080/api/auth/login',
            body
          );
          console.log(response.data);
          // localStorage.setItem("userId", response.data.userId);
          // Cookies.set('userId', response.data.userId);
          Cookies.set('accessToken', response.data.accessToken, { expires: 1 });
          clearUserInput();
          setIsSignUp(false);
          setIsOpenUser(false);
          setOpenModal(false);
          setSignUpSuccess(false);

          const token = Cookies.get('accessToken');
          if (token) {
            setAccesstoken(token);
            const decoded = jwtDecode<CustomJwtPayload>(token);
            setTokenUN(decoded['user-details'].username);
            setUserId(decoded.userId);
            setRole(decoded['user-details'].roles[0]);
          }

          alert('success', 'Log in successfully !', 'Welcome to our library');
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (
              error.response.status === 400 &&
              error.response.data.message === 'Bad credentials'
            ) {
              const incorrect = '(*) Username or password is incorrect';
              setErrors({ username: incorrect, password: incorrect });
            }
          } else {
            console.log('Unexpected error: ', error);
          }
        }
        return;
      }
    } else {
      return;
    }
  };

  const handleSignOut = () => {
    Cookies.remove('accessToken');
    setAccesstoken('');
    setRole('');
    alert('info', 'Logged out successfully !', '');
  };

  const handleisAddBook = async () => {
    try {
      const body = {
        name: newBookName,
        categoryId: newCatID,
      };
      const headers = {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      };
      const response = await axios.post(
        'http://localhost:8080/api/books',
        body,
        { headers }
      );
      // console.log(response.data);
      const newBook: Book = response.data;
      // console.log(newBook);
      dispatch(addBook(newBook));
      alert(
        'success',
        'Add book successfully !',
        response.data.name + ' has been added to library'
      );
      setNewBookName('');
      setNewCatID(0);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log('Unexpected error: ', error);
      }
    }
  };

  return (
    <div className="h-18  w-full bg-blue-100">
      <div className="flex justify-between items-center mx-5 py-2">
        <Link
          href={'/'}
          className=" font-extrabold text-5xl ml-10 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-500"
        >
          Library
        </Link>
        <div className="flex items-center gap-3">
          {role === 'ADMIN' && (
            <button
              onClick={() => setIsAddBook(true)}
              type="button"
              className="text-white flex-1 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
            >
              Add book
            </button>
          )}

          {/* <button type="button" className="text-white bg-blue-800 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Log in / Sign up</button> */}
          {accessToken === '' ? (
            <button
              data-modal-target="login-modal"
              data-modal-toggle="login-modal"
              className="text-white bg-blue-700 font-normal hover:bg-blue-800 rounded-lg px-5 py-2"
              onClick={() => setOpenModal(true)}
            >
              Log in / Sign up
            </button>
          ) : (
            <div>
              {/* <FontAwesomeIcon icon={faUser} /> */}
              <div>
                <button
                  onClick={() => setIsOpenUser(isOpenUser ? false : true)}
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-white bg-indigo-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  type="button"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <div className="ml-2">Welcome! {tokenUN}</div>
                </button>
                <div
                  id="dropdown"
                  className={`absolute ${isOpenUser ? 'block' : 'hidden'} z-50 right-5 mt-2 bg-indigo-200 divide-y divide-gray-100 rounded-lg shadow w-44`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        href={'/users/' + userId}
                        className="block px-4 py-2 hover:bg-indigo-100"
                      >
                        Rented/renting books
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-indigo-100"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => handleSignOut()}
                        href="#"
                        className="block px-4 py-2 hover:bg-indigo-100"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          <LoginModal
            open={openModal}
            onClose={() => {
              clearUserInput();
              setIsSignUp(false);
              setSignUpSuccess(false);
              setOpenModal(false);
            }}
          >
            <div className="flex">
              <Image
                src="/LoginImage.jpg"
                alt="login image"
                width={500}
                height={200}
              />
              <div className="py-4 flex-1">
                <div className="text-2xl w-full text-center text-blue-800">
                  {isSignUp
                    ? 'Create your account!'
                    : 'Welcome to our library!'}
                </div>

                <div className="flex flex-col px-4">
                  {signUpSuccess && (
                    <div
                      id="successAlert"
                      className={`flex items-center w-full my-2 p-2 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 transition-opacity ease-in-out duration-200`}
                      role="alert"
                    >
                      <svg
                        className="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Sign up success!</span>
                      </div>
                    </div>
                  )}
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
                        className={`mb-1 font-medium text-base ${errors.password ? 'text-red-500' : 'text-gray-500'}`}
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
                          onClick={() => {
                            clearUserInput();
                            setErrors({});
                            setIsSignUp(false);
                            setSignUpSuccess(false);
                          }}
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
                          onClick={() => {
                            clearUserInput();
                            setErrors({});
                            setIsSignUp(true);
                            setSignUpSuccess(false);
                          }}
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

          <AddBookModal
            open={isAddBook}
            onClose={() => {
              setIsAddBook(false);
            }}
          >
            <div className="space-y-6">
              <form className="w-full">
                <div className="flex gap-6">
                  <div className="mb-5">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Book name
                    </label>
                    <input
                      value={newBookName}
                      onChange={(e) => setNewBookName(e.target.value)}
                      type="text"
                      id="base-input"
                      placeholder="Enter book's name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Category ID
                    </label>
                    <input
                      value={newCatID}
                      onChange={(e) => setNewCatID(Number(e.target.value))}
                      type="number"
                      id="base-input"
                      placeholder="Enter category ID"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                  </div>
                </div>
              </form>
              <button
                onClick={() => handleisAddBook()}
                type="button"
                className="focus:outline-none text-white w-full bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2"
              >
                Add book
              </button>
            </div>
          </AddBookModal>

          <Alert
            type={alertType}
            title={title}
            subtitle={subtitle}
            isAlert={isAlert}
          />
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

interface isAddBookProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AddBookModal: React.FC<isAddBookProps> = ({ open, onClose, children }) => {
  return (
    <div
      //   onClick={onClose}
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={` w-1/3 bg-white shadow rounded-xl p-6  transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
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
