"use client";

import { AuthorizationFormPreviewProps } from "../../../types/authorization";
import AuthButton from "../common/AuthButton";

export default function RegisterPreview({ handleOptionChange }: AuthorizationFormPreviewProps) {
  return (
    <div className="flex z-15 w-full h-full py-4 px-8 items-center justify-center">
      <div className="flex flex-col p-6 w-full h-fit items-center justify-center gap-12 rounded-[40px] bg-[#000000a2]">
        <div className="flex flex-col items-center gap-4 text-secondary text-center">
          <h2 className="text-7xl font-bold">
            Comienza a invertir
          </h2>
          <p className="text-lg text-center">
            Si aún no tienes una cuenta, únete a nosotros y descubre todo lo que tenemos para ofrecerte.
          </p>
        </div>
        <AuthButton
          text="Registrarse"
          type="button"
          variant="blur"
          className="text-secondary"
          endArrow
          onClick={() => handleOptionChange?.("register")}
        />
      </div>
    </div>
  )
}