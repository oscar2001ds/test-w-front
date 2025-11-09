import { Field } from "formik";

interface AuthInputProps {
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  error?: string;
}
export default function AuthInput({ ...props }: AuthInputProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      <Field
        {...props}
        className="border-b-3 border-gray-300 p-2 focus:outline-none"
      />
      <div className="text-destructive text-sm h-5">
        {props.error}
      </div>
    </div>
  );
}