"use client";

import { Form, Formik } from "formik";
import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import { Label } from "@/src/shared/components/ui/label";
import { GrFacebookOption } from "react-icons/gr";
import { Button } from "@/src/shared/components/ui/button";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { AuthorizationFormPreviewProps } from "../../../types/authorization";
import { useBreakpoints } from "@/src/core";
import * as Yup from 'yup';

const LoginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
  currentPassword: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export default function LoginForm({ handleOptionChange }: AuthorizationFormPreviewProps) {
  const { isMobile, isTablet } = useBreakpoints();

  return (
    <div className="flex flex-col gap-8 w-full h-full py-10 px-14 items-center">
      <Formik
        initialValues={{ email: "", currentPassword: "" }}
        validationSchema={LoginFormValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          console.log("✅ Formulario enviado con valores:", values);
          setSubmitting(false);
        }}
      >
        {({ errors }) => (
          <Form className="flex flex-col gap-10 w-full items-center">
            <h2 className="text-4xl font-bold">Inicia sesión</h2>
            <div className="flex flex-col gap-4 w-full">
              <AuthInput name="email" placeholder="Correo electrónico" error={errors.email} />
              <AuthInput name="currentPassword" type="password" placeholder="Contraseña" error={errors.currentPassword} />
              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Recuerdame</Label>
                </div>
                <a onClick={() => handleOptionChange?.("forgotPassword")} className="text-sm cursor-pointer hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-fit">
              <AuthButton text="Iniciar sesión" type="submit" variant="default" />
              <AuthButton text="Regístrate" variant="secondary" onClick={() => handleOptionChange?.("register")} hidden={!isMobile && !isTablet} />
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex flex-col items-center gap-4 text-gray-700 text-center max-w-[70%]">
        <span>
          Si tienes dudas nos puedes contactar por nuestras redes
        </span>
        <div className="flex items-center gap-6">
          <Button variant="outline" size="icon" className="rounded-full" link="https://www.facebook.com/bancowoficial/?locale=es_LA">
            <GrFacebookOption size={20} />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" link="https://www.bancow.com.co">
            <FaGoogle size={20} />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" link="https://www.linkedin.com/company/bancow/posts/?feedView=all">
            <FaLinkedin size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}