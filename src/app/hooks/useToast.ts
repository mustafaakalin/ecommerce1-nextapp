import toast from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "custom";

interface ToastOptions {
  duration?: number;
  icon?: string;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType = "custom",
    options: ToastOptions = {}
  ) => {
    switch (type) {
      case "success":
        return toast.success(message, options);
      case "error":
        return toast.error(message, options);
      case "loading":
        return toast.loading(message, options);
      default:
        return toast(message, options);
    }
  };

  const dismissToast = (toastId: string) => {
    toast.dismiss(toastId);
  };

  const updateToast = (
    toastId: string,
    message: string,
    type: ToastType = "custom"
  ) => {
    switch (type) {
      case "success":
        toast.success(message, { id: toastId });
        break;
      case "error":
        toast.error(message, { id: toastId });
        break;
      default:
        toast(message, { id: toastId });
    }
  };

  const promiseToast = <T>(
    promise: Promise<T>,
    {
      loading = "Loading...",
      success = "Success!",
      error = "Error occurred.",
    }: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((err: any) => string);
    } = {}
  ) => {
    return toast.promise(
      promise,
      {
        loading,
        success: (data) =>
          typeof success === "function" ? success(data) : success,
        error: (err) => (typeof error === "function" ? error(err) : error),
      },
      {
        success: {
          className: "bg-success/10 text-success-content border border-success",
          icon: "✅",
        },
        error: {
          className: "bg-error/10 text-error-content border border-error",
          icon: "❌",
        },
        loading: {
          className: "bg-info/10 text-info-content border border-info",
          icon: "⏳",
        },
      }
    );
  };

  return {
    showToast,
    dismissToast,
    updateToast,
    promiseToast,
  };
};
