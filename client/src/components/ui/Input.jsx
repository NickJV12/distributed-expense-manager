import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Input({
  label,
  type = "text",
  register,
  name,
  error,
  placeholder,
}) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">

      <label className="font-medium">
        {label}
      </label>

      <div className="relative">

        <input
          type={
            isPassword
              ? show
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          {...register(name, {
            required: `${label} is required`,
          })}
          className="
            w-full
            rounded-2xl
            px-4
            py-3
            glass
            outline-none
            focus:ring-2
            focus:ring-[#A1F1CA]
          "
        />

        {isPassword && (

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="
              absolute
              right-4
              top-4
            "
          >
            {show ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>

        )}

      </div>

      {error && (

        <p className="text-red-500 text-sm">

          {error.message}

        </p>

      )}

    </div>
  );
}

export default Input;