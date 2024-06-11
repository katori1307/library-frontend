import React, { FC } from 'react';

interface AlertProps {
  type: 'success' | 'fail' | 'info';
  title: string;
  subtitle: string;
  message?: string;
  isAlert: boolean;
}

const Alert: FC<AlertProps> = ({ type, title, subtitle, isAlert }) => {
  const alertType = {
    success: `text-green-800 border border-green-300 rounded-lg bg-green-50`,
    fail: `text-red-800 border border-red-300 rounded-lg bg-red-50`,
    info: `text-blue-800 border border-blue-300 rounded-lg bg-blue-50`,
  };
  if (!isAlert) {
    return null;
  }
  return (
    <div className="fixed left-3/4 top-20 z-50">
      <div
        id="successAlert"
        className={`flex items-center max-w-max p-4 mb-4 text-sm ${alertType[type]} ${isAlert ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in-out duration-200`}
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
          <span className="font-bold">{title}</span> {subtitle}
        </div>
      </div>
    </div>
  );
};

export default Alert;
