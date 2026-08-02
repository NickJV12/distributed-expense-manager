import Button from "../ui/Button";
import Input from "../ui/Input";

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

      <Button
        type="submit"
        loading={isSubmitting}
      >
        Sign In
      </Button>
    </form>
  );
}

export default LoginForm;