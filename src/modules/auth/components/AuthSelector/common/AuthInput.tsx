import { Field } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface AuthInputProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}

export default function AuthInput({ ...props }: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = props.type === "password";
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="relative">
        <Field
          {...props}
          type={isPasswordField ? (showPassword ? "text" : "password") : props.type}
          autoComplete={props.autoComplete}
          className="border-b-3 border-gray-300 p-2 pr-10 focus:outline-none w-full"
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>
      <div className="text-destructive text-sm h-5">
        {props.error}
      </div>
    </div>
  );
}