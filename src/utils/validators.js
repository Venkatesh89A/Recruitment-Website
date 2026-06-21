export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^\d{10}$/;
export const uppercasePattern = /[A-Z]/;
export const lowercasePattern = /[a-z]/;
export const numberPattern = /\d/;
export const specialCharacterPattern = /[^A-Za-z0-9]/;

export const nameRules = {
  required: "Full name is required.",
  minLength: {
    value: 2,
    message: "Full name must be at least 2 characters.",
  },
};

export const emailRules = {
  required: "Email is required.",
  pattern: {
    value: emailPattern,
    message: "Enter a valid email address.",
  },
};

export const phoneRules = {
  required: "Phone number is required.",
  pattern: {
    value: phonePattern,
    message: "Phone number must be exactly 10 digits.",
  },
};

export const loginPasswordRules = {
  required: "Password is required.",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters.",
  },
};

export const strongPasswordRules = {
  required: "Password is required.",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters.",
  },
  validate: {
    uppercase: (value) =>
      uppercasePattern.test(value) ||
      "Password must include at least one uppercase letter.",
    lowercase: (value) =>
      lowercasePattern.test(value) ||
      "Password must include at least one lowercase letter.",
    number: (value) =>
      numberPattern.test(value) || "Password must include at least one number.",
    specialCharacter: (value) =>
      specialCharacterPattern.test(value) ||
      "Password must include at least one special character.",
  },
};

export const confirmPasswordRules = (getPassword) => ({
  required: "Confirm password is required.",
  validate: (value) => value === getPassword() || "Passwords do not match.",
});

export const getPasswordStrength = (password = "") => {
  const checks = [
    password.length >= 8,
    uppercasePattern.test(password),
    lowercasePattern.test(password),
    numberPattern.test(password),
    specialCharacterPattern.test(password),
  ];

  const score = checks.filter(Boolean).length;
  const percent = password ? Math.max(20, score * 20) : 0;

  if (!password) {
    return {
      score,
      percent,
      label: "Password strength",
      barClass: "bg-slate-200 dark:bg-slate-700",
      textClass: "text-slate-500 dark:text-slate-400",
    };
  }

  if (score <= 2) {
    return {
      score,
      percent,
      label: "Weak",
      barClass: "bg-rose-500",
      textClass: "text-rose-600 dark:text-rose-300",
    };
  }

  if (score === 3) {
    return {
      score,
      percent,
      label: "Fair",
      barClass: "bg-amber-500",
      textClass: "text-amber-600 dark:text-amber-300",
    };
  }

  if (score === 4) {
    return {
      score,
      percent,
      label: "Good",
      barClass: "bg-blue-500",
      textClass: "text-blue-600 dark:text-blue-300",
    };
  }

  return {
    score,
    percent,
    label: "Strong",
    barClass: "bg-emerald-500",
    textClass: "text-emerald-600 dark:text-emerald-300",
  };
};

export const getPasswordChecklist = (password = "") => [
  {
    label: "Uppercase",
    passed: uppercasePattern.test(password),
  },
  {
    label: "Lowercase",
    passed: lowercasePattern.test(password),
  },
  {
    label: "Number",
    passed: numberPattern.test(password),
  },
  {
    label: "Special Character",
    passed: specialCharacterPattern.test(password),
  },
  {
    label: "Minimum 8 characters",
    passed: password.length >= 8,
  },
];

export const getApiErrorMessage = (error, fallbackMessage) =>
  error?.message === "Network Error" || error?.code === "ERR_NETWORK"
    ? fallbackMessage
    : error?.response?.data?.message ||
      error?.response?.data?.error ||
      fallbackMessage;
