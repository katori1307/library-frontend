import React from 'react';
import {
  faCoffee,
  faBook,
  faEnvelope,
  faPhoneVolume,
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <div>
      <footer className="flex bg-blue-100 py-5 px-10 justify-between gap-8">
        <div className="flex flex-col max-w-md">
          <div className="flex items-center gap-5 mb-3">
            <FontAwesomeIcon icon={faBook} className="text-blue-700 h-10" />
            <h3 className="text-3xl font-bold bg-gradient-to-l from-red-500 to-blue-700 bg-clip-text text-transparent">
              Library
            </h3>
          </div>
          <p className=" text-lg">
            Welcome to our Library App! Discover, borrow, and explore a vast
            collection of books and resources right at your fingertips. Empower
            your knowledge journey with us.
          </p>
        </div>
        <div className="flex justify-center flex-1 gap-8">
          <div className="flex flex-col max-w-sm">
            <h3 className=" w-48 text-3xl font-bold underline decoration-blue-300  underline-offset-8 mb-4 text-blue-700">
              Our team
            </h3>
            <ul>
              <li className="mb-2">21127147 - Võ Anh Quân</li>
              <li className="mb-2">21127188 - Đỗ Minh Triết</li>
              <li className="mb-2">21127asd - Vũ Anh Khoa</li>
            </ul>
          </div>
          <div className="flex flex-col w-64">
            <h3 className=" text-3xl font-bold underline decoration-blue-300  underline-offset-8 mb-4 text-blue-700">
              Policies
            </h3>
            <ul>
              <li className="mb-2">
                <strong>Membership:</strong> Register to borrow materials
              </li>
              <li className="mb-2">
                <strong>Loan Period:</strong> Books can be borrowed for 3 weeks
              </li>
              <li className="mb-2">
                <strong>Renewals:</strong> Items can be renewed twice unless on
                hold by another patron.
              </li>
              <li className="mb-2">
                <strong>Late Fees:</strong> Overdue books incur a $0.25/day
                fine.
              </li>
            </ul>
          </div>
          <div className="flex flex-col max-w-sm">
            <h3 className=" text-3xl font-bold underline decoration-blue-300  underline-offset-8 mb-4 text-blue-700">
              Contact
            </h3>
            <ul>
              <li className="mb-2 flex gap-2">
                <FontAwesomeIcon icon={faPhoneVolume} width={20} />
                <p>
                  <strong>Hotline:</strong> 1900 1900
                </p>
              </li>
              <li className="mb-2 flex gap-2">
                <FontAwesomeIcon icon={faCircleCheck} width={20} />
                <p>
                  <strong>Working on:</strong> 9:00 - 12:00
                </p>
              </li>
              <li className="mb-2 flex gap-2">
                <FontAwesomeIcon icon={faEnvelope} width={20} />
                <p>
                  <strong>Email:</strong> our_team@gmail.com
                </p>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
