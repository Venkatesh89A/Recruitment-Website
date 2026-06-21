import { Link } from "react-router-dom";
import { FiArrowLeft, FiCompass } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="auth-surface flex min-h-[calc(100vh-4rem)] items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-xl rounded-card bg-white p-8 text-center shadow-soft dark:bg-slate-900 dark:shadow-softDark">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-card bg-blue-50 text-primary dark:bg-blue-950 dark:text-blue-300">
          <FiCompass className="h-8 w-8" aria-hidden="true" />
        </div>
        <p className="mt-6 text-sm font-bold uppercase text-primary dark:text-blue-300">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          The route you opened is not available in the recruitment portal.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/login"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-card bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <FiArrowLeft className="h-5 w-5" aria-hidden="true" />
            Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
}
