import toast from "react-hot-toast";

/**
 * Custom hook for toast notifications
 * Provides convenient methods for success and error messages
 */
export function useToast() {
  const showSuccess = (message: string) => {
    toast.success(message, {
      duration: 3000,
      position: "top-right",
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: "top-right",
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message, {
      position: "top-right",
    });
  };

  const dismiss = (toastId: string) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showLoading,
    dismiss,
  };
}
