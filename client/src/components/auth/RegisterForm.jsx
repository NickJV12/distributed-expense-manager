import { Link } from "react-router-dom";

function RegisterForm({
  register,
  handleSubmit,
  onSubmit,
  errors,
  watch,
  isSubmitting,
}) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
          className="w-full rounded-2xl border border-slate-300 bg-white/70 p-3 outline-none dark:border-slate-700 dark:bg-slate-900/50"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
          className="w-full rounded-2xl border border-slate-300 bg-white/70 p-3 outline-none dark:border-slate-700 dark:bg-slate-900/50"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters",
            },
          })}
          className="w-full rounded-2xl border border-slate-300 bg-white/70 p-3 outline-none dark:border-slate-700 dark:bg-slate-900/50"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          className="w-full rounded-2xl border border-slate-300 bg-white/70 p-3 outline-none dark:border-slate-700 dark:bg-slate-900/50"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-linear-to-r from-[#3A7F7A] to-[#A1F1CA] py-3 font-semibold text-white transition hover:scale-[1.02]"
      >
        {isSubmitting ? "Creating Account..." : "Register"}
      </button>

      <p className="text-center text-sm">
        Already have an account?
        <Link
          to="/login"
          className="ml-2 font-semibold text-[#3A7F7A] hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;