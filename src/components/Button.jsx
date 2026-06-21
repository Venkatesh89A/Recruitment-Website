import Loader from "./Loader";

const variantClasses = {
  primary:
    "bg-[linear-gradient(135deg,#2563EB,#3B82F6,#1D4ED8)] text-white shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/30 active:translate-y-0 focus-visible:outline-primary",
  secondary:
    "border border-blue-200 bg-white/90 text-primary shadow-sm hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md dark:border-blue-800 dark:bg-slate-900 dark:text-blue-200 dark:hover:bg-blue-950",
  ghost:
    "text-slate-700 hover:-translate-y-0.5 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  danger:
    "bg-[linear-gradient(135deg,#E11D48,#F43F5E)] text-white shadow-lg shadow-rose-600/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-600/25 active:translate-y-0",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  isLoading = false,
  disabled = false,
  icon: Icon,
  fullWidth = false,
  loadingText = "Please wait...",
  className = "",
  ...props
}) {
  const handlePointerDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--ripple-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--ripple-y",
      `${event.clientY - rect.top}px`,
    );
    props.onPointerDown?.(event);
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`btn-ripple group inline-flex min-h-12 items-center justify-center gap-2 rounded-card px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 ${
        fullWidth ? "w-full" : ""
      } ${variantClasses[variant]} ${className}`}
      {...props}
      onPointerDown={handlePointerDown}
    >
      {isLoading ? (
        <Loader label="" size="sm" className="text-current" />
      ) : Icon ? (
        <Icon className="h-5 w-5" aria-hidden="true" />
      ) : null}
      <span>{isLoading ? loadingText : children}</span>
    </button>
  );
}
