const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-4",
};

export default function Loader({
  label = "Loading",
  size = "md",
  fullScreen = false,
  className = "",
}) {
  const spinner = (
    <span
      className={`inline-block animate-spin rounded-full border-current border-t-transparent ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    />
  );

  if (fullScreen) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-appBg text-primary dark:bg-slate-950"
        role="status"
        aria-label={label}
      >
        <div className="flex flex-col items-center gap-3">
          {spinner}
          {label ? (
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {label}
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-2" role="status">
      {spinner}
      {label ? <span>{label}</span> : <span className="sr-only">Loading</span>}
    </span>
  );
}
