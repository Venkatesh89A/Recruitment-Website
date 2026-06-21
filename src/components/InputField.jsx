import { AnimatePresence, motion } from "framer-motion";

const MotionP = motion.p;

export default function InputField({
  id,
  label,
  type = "text",
  icon: Icon,
  error,
  success = false,
  registration,
  className = "",
  ...props
}) {
  const inputId = id || registration?.name || label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${inputId}-error`;
  const stateClass = error
    ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
    : success
      ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/10"
      : "border-slate-200 dark:border-slate-700";
  const iconClass = error
    ? "text-rose-400"
    : success
      ? "text-emerald-500"
      : "text-slate-400";

  return (
    <div className={className}>
      <div className="relative">
        {Icon ? (
          <Icon
            className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${iconClass}`}
            aria-hidden="true"
          />
        ) : null}
        <input
          id={inputId}
          type={type}
          placeholder=" "
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`peer h-14 w-full rounded-card border bg-white/95 px-4 pt-5 text-sm text-slate-950 shadow-sm transition-all duration-200 placeholder:text-transparent hover:-translate-y-0.5 hover:border-blue-300 focus:-translate-y-0.5 focus:border-primary focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:bg-slate-900/95 dark:text-white dark:shadow-none ${
            Icon ? "pl-12" : ""
          } ${stateClass}`}
          {...registration}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={`pointer-events-none absolute top-2 text-xs font-medium text-slate-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary dark:text-slate-400 ${
            Icon ? "left-12" : "left-4"
          }`}
        >
          {label}
        </label>
      </div>
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
