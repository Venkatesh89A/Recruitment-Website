import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import { ToastContext } from "./ToastContextDefinition";

const toastIcons = {
  success: FiCheckCircle,
  error: FiXCircle,
  warning: FiAlertTriangle,
  info: FiInfo,
};

const toastStyles = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100",
  error:
    "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100",
  info:
    "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
};

const createToastId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const MotionDiv = motion.div;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const addToast = useCallback(
    ({ type = "info", title, message, duration = 3600 }) => {
      const id = createToastId();
      const nextToast = { id, type, title, message };

      setToasts((currentToasts) => [nextToast, ...currentToasts].slice(0, 4));

      if (duration) {
        window.setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({
      addToast,
      removeToast,
      success: (message, title = "Success") =>
        addToast({ type: "success", title, message }),
      error: (message, title = "Error") =>
        addToast({ type: "error", title, message }),
      info: (message, title = "Update") =>
        addToast({ type: "info", title, message }),
      warning: (message, title = "Attention") =>
        addToast({ type: "warning", title, message }),
    }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed right-4 top-20 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const Icon = toastIcons[toast.type] || FiInfo;

            return (
              <MotionDiv
                key={toast.id}
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                className={`rounded-card border p-4 shadow-soft ${toastStyles[toast.type]}`}
                role="status"
              >
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    {toast.title ? (
                      <p className="text-sm font-semibold">{toast.title}</p>
                    ) : null}
                    <p className="mt-0.5 text-sm leading-5">{toast.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeToast(toast.id)}
                    className="rounded-full p-1 transition hover:bg-black/5 dark:hover:bg-white/10"
                    aria-label="Dismiss notification"
                  >
                    <FiX className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </MotionDiv>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
