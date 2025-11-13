"use client";

import { AuthFormPreviewProps } from "../../../types/auth.types";
import { FaArrowUp } from "react-icons/fa";
import { Button } from "@/src/shared/components/ui/button";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword({ handleOptionChange }: AuthFormPreviewProps) {
  return (
    <div className="flex flex-col gap-8 w-full h-full bg-secondary items-center">
      <Button onClick={() => { handleOptionChange?.("login") }} className="flex w-full h-30 bg-[#3a3a3a57] hover:bg-[#3a3a3a80] transition-colors duration-300 items-center justify-end px-14 rounded-none">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">
            Inicio de sesión y registro
          </span>
          <FaArrowUp size={16} />
        </div>
      </Button>
      <ForgotPasswordForm />
    </div>
  )
}