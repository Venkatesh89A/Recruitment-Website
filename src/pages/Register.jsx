import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiCircle,
  FiMail,
  FiPhone,
  FiUser,
  FiUserPlus,
} from "react-icons/fi";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import useToast from "../hooks/useToast";
import authService, {
  DEMO_MODE,
  DEMO_MODE_MESSAGE,
  isApiUnavailableError,
} from "../services/authService";
import {
  confirmPasswordRules,
  emailRules,
  emailPattern,
  getPasswordChecklist,
  getApiErrorMessage,
  nameRules,
  phonePattern,
  phoneRules,
  strongPasswordRules,
} from "../utils/validators";

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  const fullName = watch("fullName");
  const email = watch("email");
  const phone = watch("phone");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordChecklist = getPasswordChecklist(password);

  const completeDemoRegistration = () => {
    const message =
      "Your account has been created in Demo Mode. Backend integration will be enabled later.";

    setSuccessMessage(message);
    toast.success(`Registration Successful! ${message}`, "Registration Successful!");
    toast.info(DEMO_MODE_MESSAGE, "Demo Mode");
    window.setTimeout(() => navigate("/login", { replace: true }), 2000);
  };

  const onSubmit = async (values) => {
    setApiError("");
    setSuccessMessage("");

    if (DEMO_MODE) {
      completeDemoRegistration();
      return;
    }

    try {
      await authService.register({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });

      const message = "Account created successfully. Redirecting to login.";
      setSuccessMessage(message);
      toast.success(message, "Registration complete");
      window.setTimeout(() => navigate("/login", { replace: true }), 1100);
    } catch (error) {
      if (isApiUnavailableError(error)) {
        completeDemoRegistration();
        return;
      }

      setApiError(
        getApiErrorMessage(
          error,
          "Unable to create your account. Please try again.",
        ),
      );
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start a secure applicant profile for job applications, interviews, and recruiter communication."
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
              <p className="text-sm font-bold">Registration Successful!</p>
              <p className="mt-1 text-sm font-medium">{successMessage}</p>
            </div>
          </div>
        </div>
      ) : null}

      <form className="grid gap-5" noValidate onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Full Name"
          icon={FiUser}
          error={errors.fullName}
          success={(fullName || "").trim().length >= 2 && !errors.fullName}
          registration={register("fullName", nameRules)}
          autoComplete="name"
        />

        <InputField
          label="Email"
          type="email"
          icon={FiMail}
          error={errors.email}
          success={emailPattern.test(email || "") && !errors.email}
          registration={register("email", emailRules)}
          autoComplete="email"
        />

        <InputField
          label="Phone Number"
          type="tel"
          icon={FiPhone}
          error={errors.phone}
          success={phonePattern.test(phone || "") && !errors.phone}
          registration={register("phone", phoneRules)}
          autoComplete="tel"
          inputMode="numeric"
          maxLength={10}
        />

        <PasswordInput
          label="Password"
          error={errors.password}
          success={passwordChecklist.every((item) => item.passed)}
          registration={register("password", strongPasswordRules)}
          value={password}
          showStrength
          autoComplete="new-password"
        />

        <div
          className="grid gap-2 rounded-card border border-slate-200 bg-slate-50/80 p-4 text-sm dark:border-slate-800 dark:bg-slate-950/50 sm:grid-cols-2"
          aria-label="Password requirements"
        >
          {passwordChecklist.map((item) => {
            const Icon = item.passed ? FiCheckCircle : FiCircle;

            return (
              <div
                key={item.label}
                className={`flex items-center gap-2 font-medium transition ${
                  item.passed
                    ? "text-emerald-600 dark:text-emerald-300"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        <PasswordInput
          id="confirm-password"
          label="Confirm Password"
          error={errors.confirmPassword}
          success={
            Boolean(confirmPassword) &&
            confirmPassword === password &&
            !errors.confirmPassword
          }
          registration={register(
            "confirmPassword",
            confirmPasswordRules(() => getValues("password")),
          )}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          fullWidth
          icon={FiUserPlus}
          isLoading={isSubmitting}
          loadingText="Registering..."
          disabled={isSubmitting || Boolean(successMessage)}
        >
          Register
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-primary transition hover:text-blue-700 dark:text-blue-300"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
