import React, { useContext, createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validate from "validate.js";

//context
export const ToastContext = createContext();

//contextProvider
export function ToastProvider({ children }) {
  //function for toast message
  const showToast = (type, message) => {
    if (type === "success") {
      toast.success(message, { autoClose: 3000 });
    } else {
      toast.error(message, { autoClose: 3000 });
    }
  };

  //validation constraints
  const constraints = {
    title: {
      presence: {
        allowEmpty: false,
        message: "can't be empty!!",
      },
      length: {
        minimum: 5,
        maximum: 70,
        message: "must be at least 5 characters long and max 70 characters",
      },
    },
    content: {
      presence: {
        allowEmpty: false,
        message: "can't be empty!!",
      },
      length: {
        minimum: 200,
        message: "must be at least 200 characters long",
      },
    },
    category: {
      presence: {
        allowEmpty: false,
        message: "can't be empty!!",
      },
    },
  };

  //validation functions
  const validateFields = (title, content, category) => {
    const formData = { title, content, category };
    const result = validate(formData, constraints);
    if (result) {
      return result;
    }
    return null; // No validation errors
  };

  return (
    <ToastContext.Provider value={{ showToast, validateFields }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
