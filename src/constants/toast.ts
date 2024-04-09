import { toast } from 'react-toastify';

// Inside your component or function
export const notifySuccess = (message:string) => {
  toast.success(message, {
    position: 'top-right', // Position of the toast
    autoClose: 2000, // Time in milliseconds before the toast auto closes
    hideProgressBar: false, // Whether to hide the progress bar
    closeOnClick: true, // Close the toast when clicked
    pauseOnHover: true, // Pause the autoClose timer when hovered
    draggable: true, // Allow the toast to be draggable
    progress: undefined, // Progress bar style (e.g., undefined, 'rtl', 'smooth')
    className: 'custom-toast', // Custom CSS class for the toast
    bodyClassName: 'custom-toast-body', // Custom CSS class for the toast body
    progressClassName: 'custom-toast-progress', // Custom CSS class for the progress bar
  });
};


export const notifyError = (message:string) => {
    toast.error(message, {
      position: 'top-right', // Position of the toast
      autoClose: 2000, // Time in milliseconds before the toast auto closes
      hideProgressBar: false, // Whether to hide the progress bar
      closeOnClick: true, // Close the toast when clicked
      pauseOnHover: true, // Pause the autoClose timer when hovered
      draggable: true, // Allow the toast to be draggable
      progress: undefined, // Progress bar style (e.g., undefined, 'rtl', 'smooth')
      className: 'custom-toast', // Custom CSS class for the toast
      bodyClassName: 'custom-toast-body', // Custom CSS class for the toast body
      progressClassName: 'custom-toast-progress', // Custom CSS class for the progress bar
    });
  };
