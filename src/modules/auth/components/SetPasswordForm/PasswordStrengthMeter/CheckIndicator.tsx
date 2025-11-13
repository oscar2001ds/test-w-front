import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

interface ConditionProps {
  label: string;
  complete?: boolean;
}

export default function CheckIndicator({ ...props }: ConditionProps) {
  return (
    <div className="flex items-center gap-4">
      {
        props.complete ? 
        <FaRegCheckCircle className="text-green-700 min-w-5" size={20} /> : 
        <FaRegCircle className="text-gray-400 min-w-5" size={20} />
      }
      <span className={"text-sm " + (props.complete ? "text-green-700" : "text-gray-400")}>
        {props.label}
      </span>
    </div>
  )
}