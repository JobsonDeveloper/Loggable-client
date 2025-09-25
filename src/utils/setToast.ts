import { Bounce, toast, ToastOptions } from "react-toastify";

export const setToast = () => {
  const defaultConfig: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    toastId: 5,
  };

  const errorToast = (message: string) => {
    toast.error(message, {
      ...defaultConfig,
    });
  };

  const successToast = (message: string) => {
    toast.success(message, {
      ...defaultConfig,
    });
  };
  
  const warningToast = (message: string) => {
    toast.warning(message, {
      ...defaultConfig,
    });
  };

  const infoToast = (message: string) => {
    toast.info(message, {
      ...defaultConfig,
    });
  };

  const defaultToast = (message: string) => {
    toast(message, {
      ...defaultConfig,
    });
  };

  return {
    successToast,
    errorToast,
    infoToast,
    warningToast,
    defaultToast,
  };
};
