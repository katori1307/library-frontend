'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Image from 'next/image';
import Cookies from 'js-cookie';
import Alert from '@/app/Alert';
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface Book {
  category: {
    id: number;
    name: string;
  };
  id: number;
  name: string;
  quantity: number;
}

interface Category {
  id: string;
  name: string;
}

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

type AlertType = 'info' | 'success' | 'fail';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function BookDetail({ params }: { params: { bookId: string } }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [book, setBook] = useState<Book | null>(null);
  const [endDate, setEndDate] = useState<string>('');
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [alertType, setAlertType] = useState<AlertType>('info');
  const [role, setRole] = useState<string>('');
  const [newBookName, setNewBookName] = useState<string>('');
  const [newCatID, setNewCatID] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/books/` + params.bookId
        );
        setBook(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const token = Cookies.get('accessToken');
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setRole(decoded['user-details'].roles[0]);
    }
  }, []);

  const alert = (type: AlertType, title: string, subtitle: string) => {
    setTitle(title);
    setSubtitle(subtitle);
    setAlertType(type);
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  const handleRentBook = async () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      alert('fail', 'Failed !', 'You need to log in to rent a book');
      return;
    }
    try {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      const userId = decoded.userId;
      const body = {
        userId: userId,
        bookId: params.bookId,
        endDate: endDate,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log(body);
      console.log(headers);
      const response = await axios.post(
        `${API_URL}/rent`,
        body,
        { headers }
      );
      console.log(response.data);
      alert("success", "Rent book successfully!", `You've rented ${book?.name}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          // console.log("forbidden");
          // console.log(error.response?.data.message);
          alert(
            'fail',
            error.response?.data.message,
            'Only user can rent a book'
          );
          return;
        }
        if (error.response?.status === 400) {
          console.log(error.response?.data.message);
          alert('fail', error.response?.data.message, 'Book is out of stock !');
          return;
        }
      } else {
        console.log('Unexpected error: ', error);
      }
    }
  };

  const handleAddQuantity = async () => {
    try {
      const body = {
        quantity: quantity,
      };

      const headers = {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      };

      const response = await axios.patch(
        `${API_URL}/books/` + params.bookId,
        body,
        { headers }
      );
      // console.log(response.data);
      if (book) {
        setBook({ ...book, quantity: response.data.quantity });
        alert('success', 'Success !', `Added ${quantity} books successfully`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log('Unexpected error');
      }
    }
  };

  const handleUpdateBook = async () => {
    if (newBookName.trim() === '') {
      alert('fail', 'Update failed !', "New book's name cannot be empty");
      return;
    }
    try {
      const body = {
        name: newBookName,
        categoryId: newCatID,
      };
      const headers = {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      };
      const response = await axios.put(
        `${API_URL}/books/` + params.bookId,
        body,
        { headers }
      );
      setBook(response.data);
      alert('success', 'Update successfully !', 'Book has been updated');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert('fail', 'Update failed !', error.response?.data.message);
        }
      } else {
        console.log('Unexpected error: ', error);
      }
    }
  };

  return (
    <div className=" px-4 py-3 grid grid-cols-2 gap-5 bg-blue-300">
      <div className=" grid-flow-row-dense p-14 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          Book name: {book?.name}
        </h5>
        <p className=" text-lg mb-1 font-normal text-gray-600">
          <strong>Category:</strong>{' '}
          <span className="text-indigo-700">{book?.category.name}</span>
        </p>
        <p className=" text-lg mb-1 font-normal text-gray-500">
          <strong>Quantity: </strong>
          <span className="text-rose-500">{book?.quantity}</span>
        </p>
      </div>
      <div className=" grid grid-rows-2 gap-3">
        <div className=" w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          {role === 'USER' || role === "" && (
            <div className="space-y-6">
              <h5 className="text-2xl font-medium text-gray-900">
                Enter end date to rent a book
              </h5>
              <div>
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  End date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="tphcm"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="max-w-xs"></div>
              <button
                onClick={() => handleRentBook()}
                type="submit"
                className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
              >
                Rent now
              </button>
            </div>
          )}
          {role === 'ADMIN' && (
            <div className="space-y-6">
              {/* <h5 className="text-2xl font-medium text-gray-900">
              Enter end date to rent a book
            </h5>
            <div>
              <label
                htmlFor="endDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                End date
              </label>
              <input
                type="date"
                name="endDate"
                id='endDate'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="tphcm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div> */}
              <form className="max-w-xs">
                <label
                  htmlFor="quantity-input"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Add more quantity to{' '}
                  <span className="font-bold">{book?.name}</span>
                </label>
                <div className="relative flex items-center max-w-[8rem]">
                  <button
                    type="button"
                    onClick={() => {
                      if (quantity === 1) {
                        return;
                      }
                      setQuantity(quantity - 1);
                    }}
                    id="decrement-button"
                    data-input-counter-decrement="quantity-input"
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="number"
                    id="quantity-input"
                    data-input-counter
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                    value={quantity}
                    disabled
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    id="increment-button"
                    data-input-counter-increment="quantity-input"
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              <button
                onClick={() => handleAddQuantity()}
                type="submit"
                className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
              >
                Add quantity
              </button>
            </div>
          )}
        </div>
        <div className=" w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
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
                    placeholder="Enter new book's name"
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
              onClick={() => handleUpdateBook()}
              type="button"
              className="focus:outline-none text-white w-full bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2"
            >
              Update book
            </button>
          </div>
        </div>
      </div>
      <Alert
        type={alertType}
        title={title}
        subtitle={subtitle}
        isAlert={isAlert}
      />
    </div>
  );
}
