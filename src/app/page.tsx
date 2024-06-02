'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

const API_KEY = 'AIzaSyCOWsPiwXXZu0NCclfjg-gvBQJb1VvSFCU';

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

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://www.googleapis.com/books/v1/volumes?q=react&orderBy=relevance&maxResults=18&key=' +
          API_KEY
      );
      setBooks(response.data.items);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(books);
    let temp_thumbs: string[] = [];
    books.slice(0, 5).map((t, index) => {
      temp_thumbs.push(t.volumeInfo.imageLinks.thumbnail);
    });
    setThumbnails(temp_thumbs);
  }, [books]);

  const renderBooks = () => {
    return books.map((b, index) => {
      return (
        <Link
          href={`/books/${b.id}`}
          key={index}
          className=" cursor-pointer relative group flex flex-col items-center min-w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="w-40 pt-4">
            <Image
              width={150}
              height={150}
              className="rounded-t-lg"
              src={b.volumeInfo.imageLinks.smallThumbnail}
              alt={b.volumeInfo.title}
            />
          </div>
          <div className="p-5 pb-0">
            <a href="#">
              <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900">
                {b.volumeInfo.title}
              </h5>
            </a>
            <p className="text-xs font-normal text-gray-700">
              {b.volumeInfo.subtitle}
            </p>
          </div>
          <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-80 transition-opacity"></div>
          <div className=" w-full bg-gradient-to-br from-indigo-600 to-blue-400 bg-clip-text text-transparent absolute -bottom-5 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:-translate-y-full transition-transform duration-500 font-extrabold text-5xl max-w-max text-center">
            <div>More info</div>
            <FontAwesomeIcon
              icon={faArrowRightLong}
              className="text-indigo-300"
            />
          </div>
        </Link>
      );
    });
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-5 mb-10 shadow-xl shadow-blue-200">
        <Carousel>
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
        </Carousel>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {renderBooks()}
        {/* <div className=" min-w-52 bg-white border border-gray-200 rounded-lg shadow ">
            <a href="#">
              <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                Buy now
              </a>
            </div>
          </div> */}
      </div>
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
