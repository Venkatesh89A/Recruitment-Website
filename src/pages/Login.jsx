import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiAlertCircle, FiLogIn, FiMail } from "react-icons/fi";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import {
  DEMO_MODE_MESSAGE,
  REMEMBERED_EMAIL_KEY,
  REMEMBER_ME_KEY,
} from "../services/authService";
import {
  emailRules,
  emailPattern,
  getApiErrorMessage,
  loginPasswordRules,
} from "../utils/validators";

const getLoginDefaults = () => ({
  email: window.localStorage.getItem(REMEMBERED_EMAIL_KEY) || "",
  password: "",
  rememberMe: window.localStorage.getItem(REMEMBER_ME_KEY) === "true",
});

export default function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: getLoginDefaults(),
  });
  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (values) => {
    setApiError("");

    try {
      const session = await login(
        {
          email: values.email,
          password: values.password,
        },
        values.rememberMe,
      );

      if (session.demoMode) {
        toast.info(DEMO_MODE_MESSAGE, "Demo Mode");
      } else {
        toast.success("You are now signed in.", "Welcome back");
      }

      navigate(location.state?.from?.pathname || "/profile", { replace: true });
    } catch (error) {
      setApiError(
        getApiErrorMessage(
          error,
          "Unable to log in. Please check your credentials and try again.",
        ),
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage applications, shortlist candidates, and continue your hiring workflow."
    >
      {apiError ? (
        <div
          className="mb-5 rounded-card border border-rose-200 bg-rose-50 p-4 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-100"
          role="alert"
        >
          <div className="flex gap-3">
            <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium">{apiError}</p>
          </div>
        </div>
      ) : null}

      <form className="grid gap-5" noValidate onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Email"
          type="email"
          icon={FiMail}
          error={errors.email}
          success={emailPattern.test(email || "") && !errors.email}
          registration={register("email", emailRules)}
          autoComplete="email"
        />

        <PasswordInput
          label="Password"
          error={errors.password}
          success={(password || "").length >= 8 && !errors.password}
          registration={register("password", loginPasswordRules)}
          autoComplete="current-password"
        />

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex cursor-pointer items-center gap-3 font-medium text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900"
              {...register("rememberMe")}
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="font-semibold text-primary transition hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          icon={FiLogIn}
          isLoading={isSubmitting}
          loadingText="Login..."
          disabled={isSubmitting}
        >
          Login
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        New to RecruitPro?{" "}
        <Link
          to="/register"
          className="font-bold text-primary transition hover:text-blue-700 dark:text-blue-300"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
