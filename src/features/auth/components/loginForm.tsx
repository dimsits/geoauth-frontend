import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useLogin } from "../hooks/useLogin";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  /**
   * Called after a successful login mutation finishes.
   * Keep navigation/redirect logic in the page/route layer.
   */
  onSuccess?: () => void;

  /**
   * Optional dev convenience.
   */
  defaultEmail?: string;

  className?: string;
};

export default function LoginForm({ onSuccess, defaultEmail, className }: LoginFormProps) {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: {
      email: defaultEmail ?? "",
      password: "",
    },
  });

  useEffect(() => {
    if (defaultEmail) setValue("email", defaultEmail);
  }, [defaultEmail, setValue]);

  const onSubmit = async (values: LoginFormValues) => {
    await login.mutateAsync(values);
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={[
        "w-full max-w-md space-y-4 rounded-lg border border-border bg-surface p-4",
        className ?? "",
      ].join(" ")}
      aria-label="Login form"
    >
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email.",
            },
          })}
        />
        {errors.email?.message ? (
          <p className="text-sm text-error">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring"
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required.",
            minLength: { value: 6, message: "Password must be at least 6 characters." },
          })}
        />
        {errors.password?.message ? (
          <p className="text-sm text-error">{errors.password.message}</p>
        ) : null}
      </div>

      {login.error ? (
        <div className="rounded-md border border-border bg-background p-3">
          <p className="text-sm text-error">{login.error.message}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!isValid || login.isPending}
        className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
      >
        {login.isPending ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-sm text-muted">
        Use the seeded user credentials from the backend to log in. 
        test@geoauth.dev
        password123
      </p>
    </form>
  );
}
