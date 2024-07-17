import React, { useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";

export default function Snackbar({ message, show, onClose, type }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 transition-all duration-200 ease-in-out transform animate-slideUp">
      <div
        className={`${
          type === "success" ? "bg-green-500" : "bg-red-600"
        } text-white p-2 rounded-lg text-center mx-auto max-w-md relative`}
      >
        <div className="ring-slate-50 ring-1 rounded-md p-1">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 mt-2 mr-1 text-white"
          >
            <ImCancelCircle />
          </button>
          {message}
        </div>
      </div>
    </div>
  );
}
