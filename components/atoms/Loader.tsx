import React from "react";

const Loader = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center h-100 py-10">
      <svg
        className="animate-spin h-10 w-10 text-gray-900 dark:text-gray-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          strokeWidth={4}
          stroke="currentColor"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8l4 4a8 8 0 01-8 8v-8z"
        />
      </svg>
      <span className="animate-pulse text-gray-900 dark:text-gray-300 text-lg font-medium ml-4">
        {text}
      </span>
    </div>
  );
};

export default Loader;
