import toast from "react-hot-toast";
import { useCallback, useMemo } from "react";

/**
 * Custom hook for toast notifications
 * Provides convenient methods for success and error messages
 */
export function useToast() {
  const showSuccess = useCallback((message: string) => {
    toast.success(message, {
      duration: 3000,
      position: "top-right",
    });
  }, []);

  const showError = useCallback((message: string) => {
    toast.error(message, {
      duration: 4000,
      position: "top-right",
    });
  }, []);

  const showLoading = useCallback((message: string) => {
    return toast.loading(message, {
      position: "top-right",
    });
  }, []);

  const dismiss = useCallback((toastId: string) => {
    toast.dismiss(toastId);
  }, []);

  return useMemo(
    () => ({
      showSuccess,
      showError,
      showLoading,
      dismiss,
    }),
    [showSuccess, showError, showLoading, dismiss]
  );
}
