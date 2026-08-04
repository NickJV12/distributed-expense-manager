import Button from "../ui/Button";
import Input from "../ui/Input";
import { Link } from "react-router-dom";

function LoginForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
}) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password}
        placeholder="Enter your password"
      />
       
       <div className="flex justify-end">
         <Link
              to="/forgot-password"
              className="text-sm text-[#3A7F7A] hover:underline">
               Forgot Password?
            </Link>
           </div>
      <Button
        type="submit"
        loading={isSubmitting}
      >
        Sign In
      </Button>
      <button
  type="button"
  className="
    mt-4
    w-full
    rounded-2xl
    border
    border-gray-300
    bg-white
    py-3
    font-medium
    text-gray-700
    transition
    hover:bg-gray-50
    dark:border-slate-600
    dark:bg-slate-800
    dark:text-white
  "
>
  Continue with Google
</button>
    </form>
  );
}

export default LoginForm;