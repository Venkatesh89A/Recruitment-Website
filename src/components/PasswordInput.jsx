import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { getPasswordStrength } from "../utils/validators";

const MotionP = motion.p;

export default function PasswordInput({
  id,
  label = "Password",
  error,
  success = false,
  registration,
  value = "",
  showStrength = false,
  autoComplete = "current-password",
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const inputId = id || registration?.name || "password";
  const errorId = `${inputId}-error`;
  const strength = getPasswordStrength(value);
  const stateClass = error
    ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
    : success
      ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/10"
      : "border-slate-200 dark:border-slate-700";

  return (
    <div className={className}>
      <div className="relative">
        <FiLock
          className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${
            error
              ? "text-rose-400"
              : success
                ? "text-emerald-500"
                : "text-slate-400"
          }`}
          aria-hidden="true"
        />
        <input
          id={inputId}
          type={isVisible ? "text" : "password"}
          placeholder=" "
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`peer h-14 w-full rounded-card border bg-white/95 px-12 pt-5 text-sm text-slate-950 shadow-sm transition-all duration-200 placeholder:text-transparent hover:-translate-y-0.5 hover:border-blue-300 focus:-translate-y-0.5 focus:border-primary focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:bg-slate-900/95 dark:text-white dark:shadow-none ${stateClass}`}
          {...registration}
        />
        <label
          htmlFor={inputId}
          className="pointer-events-none absolute left-12 top-2 text-xs font-medium text-slate-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary dark:text-slate-400"
        >
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          className="absolute right-3 top-1/2 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? (
            <FiEyeOff className="h-5 w-5" aria-hidden="true" />
          ) : (
            <FiEye className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
      {showStrength ? (
        <div className="mt-3" aria-live="polite">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-300 ${strength.barClass}`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className={`font-semibold ${strength.textClass}`}>
              {strength.label}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {strength.score}/5
            </span>
          </div>
        </div>
      ) : null}
      <AnimatePresence initial={false}>
        {error ? (
          <MotionP
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-sm font-medium text-rose-600 dark:text-rose-300"
          >
            {error.message}
          </MotionP>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
