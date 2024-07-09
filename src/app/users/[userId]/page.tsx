'use client';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';

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

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function UserDashboard({
  params,
}: {
  params: { userId: string };
}) {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [username, setUsername] = useState<string>('');
  const [emptyList, setEmptyList] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          `${API_URL}/rent/` + params.userId,
          { headers }
        );
        console.log(response.data);
        if (response.data.length === 0) {
          setEmptyList(true);
          return;
        }
        setBookList(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log('Unexpected error ', error);
        }
      }
    };
    const token = Cookies.get('accessToken');
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setUsername(decoded['user-details'].username);

      fetchData();
    }
  }, [params.userId]);
  const renderBooks = () => {
    return bookList.map((b, index) => {
      return (
        <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {b.id}
          </th>
          <td className="px-6 py-4">{b.name}</td>
          <td className="px-6 py-4">{b.category.name}</td>
        </tr>
      );
    });
  };

  return (
    <div className=" px-3 py-2 grid grid-cols-2 gap-3 bg-blue-300">
      <div className="w-full flex justify-center items-center bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col gap-5 items-center pb-10">
          <Image
            width={150}
            height={150}
            className=" p-2 mt-3 bg-indigo-300 w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/librarian.png"
            alt="avatar"
          />
          <h5 className="mb-1 text-3xl font-medium text-gray-900">
            {username}
          </h5>
        </div>
      </div>
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900">
            Renting/rented books
          </h5>
        </div>
        <div className="flow-root">
          <div className="relative overflow-x-auto overflow-y-auto max-h-72 shadow-md sm:rounded-lg">
            {bookList.length ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Book
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody>{renderBooks()}</tbody>
              </table>
            ) : (
              <div className="text-2xl text-center text-rose-600 py-2 px-3">
                There&apos;s no rented/renting book
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}