import { Button } from "@/src/shared/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


interface AuthButtonProps {
  text?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "secondary" | "blur";
  startArrow?: boolean;
  endArrow?: boolean;
  hidden?: boolean;
  className?: string;
  isLoading?: boolean;
}

export default function AuthButton({ ...props }: AuthButtonProps) {
  return (
    <Button
      type={props.type}
      variant={props.variant}
      className={`px-20 py-6 rounded-4xl ${props.className}`}
      startIcon={props.startArrow ? <FaArrowLeft /> : undefined}
      endIcon={props.endArrow ? <FaArrowRight /> : undefined}
      onClick={props.onClick}
      hidden={props.hidden}
      isLoading={props.isLoading}
    >
      {props.text}
    </Button>
  );
}
