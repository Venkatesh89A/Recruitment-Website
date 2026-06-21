import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiMail,
  FiSend,
  FiShield,
} from "react-icons/fi";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import InputField from "../components/InputField";
import useToast from "../hooks/useToast";
import authService, {
  DEMO_MODE,
  DEMO_MODE_MESSAGE,
  isApiUnavailableError,
} from "../services/authService";
import { emailPattern, emailRules, getApiErrorMessage } from "../utils/validators";

export default function ForgotPassword() {
  const toast = useToast();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });
  const email = watch("email");

  const completeDemoReset = () => {
    const message =
      "Password reset link generated (Demo Mode). In production this email will be sent through the backend.";

    setSuccessMessage(message);
    toast.success(message, "Demo Mode");
    toast.info(DEMO_MODE_MESSAGE, "Demo Mode");
    reset();
  };

  const onSubmit = async (values) => {
    setApiError("");
    setSuccessMessage("");

    if (DEMO_MODE) {
      completeDemoReset();
      return;
    }

    try {
      await authService.forgotPassword({ email: values.email });
      const message = "Password reset link sent.";
      setSuccessMessage(message);
      toast.success(message, "Check your email");
      reset();
    } catch (error) {
      if (isApiUnavailableError(error)) {
        completeDemoReset();
        return;
      }

      setApiError(
        getApiErrorMessage(
          error,
          "Unable to send a reset link. Please try again.",
        ),
      );
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your account email and receive a secure link to continue your recruitment workflow."
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

      {successMessage ? (
        <div
          className="mb-5 rounded-card border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
          role="status"
        >
          <div className="flex gap-3">
            <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold">
                Password reset link generated (Demo Mode)
              </p>
              <p className="mt-1 text-sm font-medium">
                In production this email will be sent through the backend.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mb-5 rounded-card border border-blue-100 bg-blue-50/80 p-4 text-sm text-slate-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-slate-200">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-white text-primary shadow-sm dark:bg-slate-900 dark:text-blue-300">
            <FiShield className="h-5 w-5" aria-hidden="true" />
          </span>
          <p>
            We will verify your email and generate a secure reset link for your
            RecruitPro account.
          </p>
        </div>
      </div>

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

        <Button
          type="submit"
          fullWidth
          icon={FiSend}
          isLoading={isSubmitting}
          loadingText="Sending..."
        >
          Send Reset Link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        Remembered your password?{" "}
        <Link
          to="/login"
          className="font-bold text-primary transition hover:text-blue-700 dark:text-blue-300"
        >
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}
