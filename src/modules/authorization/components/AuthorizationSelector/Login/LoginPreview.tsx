"use client";

import { AuthorizationFormPreviewProps } from "../../../types/authorization";
import AuthButton from "../common/AuthButton";

export default function LoginPreview({ handleOptionChange }: AuthorizationFormPreviewProps) {
  return (
    <div className="flex w-full h-full py-4 px-8 items-center justify-center">
      <div className="flex flex-col p-6 w-full h-fit items-center justify-center gap-12 rounded-[40px] bg-[#000000a2]">
        <div className="flex flex-col items-center gap-4 text-secondary text-center ">
          <h2 className="text-7xl font-bold">
            Hola de nuevo!
          </h2>
          <p className="text-lg text-center">
            Si tienes una cuenta, inicia sesión aquí y sigue disfrutando de los beneficios que ofrecemos.
          </p>
        </div>
        <AuthButton
          text="Iniciar sesión"
          type="button"
          variant="blur"
          className="text-secondary"
          startArrow
          onClick={() => handleOptionChange?.("login")}
        />
      </div>
    </div>
  )
}