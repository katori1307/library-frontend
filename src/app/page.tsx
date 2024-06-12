'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './GlobalRedux/store';
import { setBooks } from './GlobalRedux/Features/Books/booksSlice';

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

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);

  // const [books, setBooks] = useState<Book[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    console.log("base url", API_URL);
    const fetchData = async () => {
      try {
        let response;
        // response = await axios.get('http://localhost:8080/api/books');
        response = await axios.get(`${API_URL}/books`);
        console.log(response.data);
        // setBooks(response.data);
        dispatch(setBooks(response.data));

        response = await axios.get(`${API_URL}/categories`);
        // console.log(response.data._embedded.categories);
        setCategories(response.data._embedded.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderCaregories = () => {
    return categories.map((category, index) => {
      return (
        <li key={index}>
          <a
            href="#"
            className="flex items-center p-2 text-gray-500 text-base rounded-lg hover:bg-gray-200 group transition duration-200"
          >
            <span className="ms-3">{category.name}</span>
          </a>
        </li>
      );
    });
  };

  // const renderBooks = () => {
  //   return books.map((b, index) => {
  //     return (
  //       <Link
  //         href={`/books/${b.id}`}
  //         key={index}
  //         className=" w-44 h-80 cursor-pointer relative group flex flex-col items-center min-w-44 bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
  //       >
  //         <div className="w-40 pt-4 flex justify-center items-center">
  //           <Image
  //             width={110}
  //             height={125}
  //             className="rounded-t-lg"
  //             src={b.volumeInfo.imageLinks.smallThumbnail}
  //             alt={b.volumeInfo.title}
  //           />
  //         </div>
  //         <div className="p-5 pb-0">
  //           <a href="#">
  //             <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900">
  //               {b.volumeInfo.title}
  //             </h5>
  //           </a>
  //           <p className="text-xs font-normal text-gray-700">
  //             {b.volumeInfo.subtitle}
  //           </p>
  //         </div>
  //         <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-80 transition-opacity"></div>
  //         <div className=" w-full bg-gradient-to-br from-indigo-600 to-blue-400 bg-clip-text text-transparent absolute -bottom-5 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:-translate-y-full transition-transform duration-500 font-extrabold text-5xl max-w-max text-center">
  //           <div>More info</div>
  //           <FontAwesomeIcon
  //             icon={faArrowRightLong}
  //             className="text-indigo-300"
  //           />
  //         </div>
  //       </Link>
  //     );
  //   });
  // };

  const renderBooks = () => {
    return books.map((b, index) => {
      return (
        <Link
          href={`/books/${b.id}`}
          key={index}
          className="w-44 h-40 p-3 cursor-pointer relative group flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
        >
          <div className="w-40 flex justify-center items-center">
            {/* <Image
              width={110}
              height={125}
              className="rounded-t-lg"
              src={b.volumeInfo.imageLinks.smallThumbnail}
              alt={b.volumeInfo.title}
            /> */}
          </div>
          <div className="">
            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900">
              {b.name}
            </h5>
            <p className="text-sm font-normal text-gray-700">
              Category:{' '}
              <span className="text-indigo-700">{b.category.name}</span>
            </p>
            <p className="text-sm font-normal text-gray-700">
              Quantity: <span className="text-rose-500">{b.quantity}</span>
            </p>
          </div>
          <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-80 transition-opacity"></div>
          <div className=" w-full bg-gradient-to-br from-teal-300 to-indigo-400 bg-clip-text text-transparent absolute -bottom-5 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:-translate-y-full transition-transform duration-500 font-extrabold text-3xl max-w-max text-center">
            <div>Rent now</div>
            <FontAwesomeIcon
              icon={faArrowRightLong}
              className="text-teal-400"
            />
          </div>
        </Link>
      );
    });
  };

  const SideBar = () => {
    return (
      <aside className="self-start sticky top-0 col-span-1">
        <div className=" border shadow rounded-lg h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li>
              <div className="flex items-center p-2 text-gray-900 text-lg rounded-lg ">
                <span className="ms-1">Categories</span>
              </div>
            </li>
            {renderCaregories()}
          </ul>
        </div>
      </aside>
    );
  };

  return (
    <div className="grid grid-cols-8 mx-5 mb-5 mt-5">
      <SideBar />
      <main className="col-span-7 ml-5">
        <div className="max-w-3xl mx-auto mb-10 shadow-xl shadow-blue-200">
          {/* <Carousel>
            {books.slice(0, 5).map((b, i) => {
              return (
                <div
                  key={i}
                  className="flex z-10 min-w-full border border-gray-200 rounded-lg shadow"
                >
                  <div className="flex justify-center min-w-72 items-center w-1/2 bg-blue-100 px-3 py-3">
                    <Image
                      className=" object-cover rounded-lg shadow-2xl border border-blue-200"
                      width={150}
                      height={150}
                      layout="intrinsic"
                      src={b.volumeInfo.imageLinks.thumbnail}
                      alt={b.id}
                    />
                  </div>
                  <div className="flex flex-col py-3 p-4 leading-normal bg-blue-50">
                    <h5 className="text-2xl font-medium tracking-tight">
                      {b.volumeInfo.title}
                    </h5>
                    <div className="mt-10 flex-1 pr-8">
                      <ReactMarkdown className=" mb-1 text-base font-normal text-gray-700">
                        {b.searchInfo.textSnippet}
                      </ReactMarkdown>
                      <p className=" text-sm mb-1 font-normal text-gray-600">
                        <strong>Authors:</strong> {b.volumeInfo.authors}
                      </p>
                      <p className=" text-sm mb-1 font-normal text-gray-500">
                        <strong>Published: </strong>
                        {b.volumeInfo.publishedDate}
                      </p>
                      <p className=" text-sm mb-1 font-normal text-gray-500">
                        <strong>Language: </strong>
                        {b.volumeInfo.language}
                      </p>
                      <p className=" text-sm mb-1 font-normal text-gray-500">
                        <strong>Publisher: </strong>
                        {b.volumeInfo.publisher}
                      </p>
                      {b.saleInfo.retailPrice && (
                        <p className="text-sm mb-1 font-normal text-gray-500">
                          <strong>Retail Price: </strong>
                          {b.saleInfo.retailPrice.amount}{' '}
                          {b.saleInfo.retailPrice.currencyCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel> */}
        </div>
        <div className="grid grid-cols-6 gap-2">{renderBooks()}</div>
      </main>
    </div>
  );
}

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [curr, setCurr] = useState<number>(0);
  const prev = () => {
    setCurr(curr === 0 ? React.Children.count(children) - 1 : curr - 1);
  };
  const next = () => {
    setCurr(curr === React.Children.count(children) - 1 ? 0 : curr + 1);
  };
  useEffect(() => {
    console.log(curr);
  }, [curr]);
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {children}
      </div>
      <div className="absolute z-20 inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="bg-white rounded-full p-1 flex justify-center items-center hover:bg-gray-100"
        >
          <FontAwesomeIcon
            style={{ fontSize: '30px', padding: '5px' }}
            icon={faChevronLeft}
          />
        </button>
        <button
          onClick={next}
          className="bg-white rounded-full p-1 flex justify-center items-center hover:bg-gray-100"
        >
          <FontAwesomeIcon
            style={{ fontSize: '30px', padding: '5px' }}
            icon={faChevronRight}
          />
        </button>
      </div>
    </div>
  );
};
