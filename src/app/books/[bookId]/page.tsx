'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Image from 'next/image';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    publishedDate: string;
    description: string;
    authors: [];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    publisher: string;
  };
  saleInfo: {
    country: string;
    retailPrice?: {
      amount?: number;
      currencyCode?: string;
    };
  };
  searchInfo: {
    textSnippet: string;
  };
}

export default function BookDetail({ params }: { params: { bookId: string } }) {
  const [quantity, setQUantity] = useState<number>(1);
  const [book, setBook] = useState<Book | null>(null);
  const handleIncrement = () => {
    setQUantity(quantity + 1);
  };
  const handleDecrement = () => {
    setQUantity(quantity === 0 ? 0 : quantity - 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://www.googleapis.com/books/v1/volumes/' + params.bookId
      );
      setBook(response.data);
      //   console.log(response.data)
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(book);
  }, [book]);
  return (
    <div className=" px-4 py-3 grid grid-cols-3 gap-5 bg-blue-300">
      <div className="grid gap-2">
        <div className="flex justify-center items-center">
          {book && (
            <Image
              width={200}
              height={200}
              className="h-auto max-w-full rounded-lg"
              src={book.volumeInfo.imageLinks.thumbnail}
              alt=""
            />
          )}
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className=" grid-flow-row-dense p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {book?.volumeInfo.title}
        </h5>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            4.95
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>
        <p className="mb-3 text-sm font-normal text-gray-700">
          {book?.volumeInfo.subtitle}
        </p>
        <p className=" text-sm mb-1 font-normal text-gray-600">
          <strong>Authors:</strong> {book?.volumeInfo.authors}
        </p>
        <p className=" text-sm mb-1 font-normal text-gray-500">
          <strong>Published: </strong>
          {book?.volumeInfo.publishedDate}
        </p>
        <p className=" text-sm mb-1 font-normal text-gray-500">
          <strong>Language: </strong>
          {book?.volumeInfo.language}
        </p>
        <p className=" text-sm mb-1 font-normal text-gray-500">
          <strong>Publisher: </strong>
          {book?.volumeInfo.publisher}
        </p>
        {book?.saleInfo.retailPrice && (
          <p className="text-sm mb-1 font-normal text-red-500">
            <strong>Retail Price: </strong>
            {book?.saleInfo.retailPrice.amount}{' '}
            {book?.saleInfo.retailPrice.currencyCode}
          </p>
        )}
        <div
          className="mt-5 cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Show description
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </div>
      </div>
      <div className=" w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900">
            Sign in to our platform
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your address
            </label>
            <input
              type="address"
              name="address"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="tphcm"
              required
            />
          </div>
          <div className="max-w-xs">
            <label
              htmlFor="quantity-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Choose quantity:
            </label>
            <div className="relative flex items-center max-w-[8rem]">
              <button
                onClick={handleDecrement}
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className=" flex justify-center items-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="text"
                id="quantity-input"
                data-input-counter
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                value={quantity}
                required
              />
              <button
                onClick={handleIncrement}
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className=" flex justify-center items-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add to cart
          </button>
          <button
            type="submit"
            className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Rent now
          </button>
        </div>
      </div>
    </div>
  );
}
