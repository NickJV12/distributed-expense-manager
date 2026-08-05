import Button from "../ui/Button";
import Input from "../ui/Input";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function LoginForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
  onGoogleSuccess,
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
      <div className="mt-4 flex justify-center">
  <GoogleLogin
    onSuccess={onGoogleSuccess}
    onError={() => {
      console.log("Google Login Failed");
    }}
    theme="outline"
    size="large"
    width="340"
  />
</div>
    </form>
  );
}

export default LoginForm;