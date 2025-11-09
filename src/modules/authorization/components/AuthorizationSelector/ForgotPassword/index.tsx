"use client";

import { AuthorizationFormPreviewProps } from "../../../types/authorization";
import { FaArrowUp } from "react-icons/fa";
import { Button } from "@/src/shared/components/ui/button";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword({ selectedOption, handleOptionChange }: AuthorizationFormPreviewProps) {
  return (
    <div className={`absolute z-20 flex flex-col gap-8 w-[50%] h-full bg-secondary overflow-hidden items-center transition-all duration-700 ${selectedOption === "forgotPassword" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}>
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