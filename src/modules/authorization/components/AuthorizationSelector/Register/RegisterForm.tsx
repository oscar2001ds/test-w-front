"use client";

import { Form, Formik } from "formik";
import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";
import { GrFacebookOption } from "react-icons/gr";
import { Button } from "@/src/shared/components/ui/button";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { AuthorizationFormPreviewProps } from "../../../types/authorization";
import { useBreakpoints } from "@/src/core";
import * as Yup from 'yup';

const SetPasswordFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es obligatorio'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
  currentPassword: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[@$!%*?&]/, 'La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &)')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('currentPassword'), undefined], 'Las contraseñas deben coincidir')
    .required('Por favor confirma tu contraseña'),
});

export default function RegisterForm({ handleOptionChange }: AuthorizationFormPreviewProps) {
  const { isMobile, isTablet } = useBreakpoints();

  return (
    <div className="flex flex-col gap-8 w-full h-full py-10 px-14 items-center">
      <Formik
        initialValues={{
          name: "",
          email: "",
          currentPassword: "",
          confirmPassword: ""
        }}
        validationSchema={SetPasswordFormValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          console.log("✅ Formulario enviado con valores:", values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-10 w-full items-center">
            <h2 className="text-4xl font-bold">Regístrate</h2>
            <div className="flex flex-col gap-4 w-full">
              <AuthInput name="name" placeholder="Nombre" error={errors.name} />
              <AuthInput name="email" placeholder="Correo electrónico" error={errors.email} />
              <AuthInput name="currentPassword" type="password" placeholder="Contraseña" error={errors.currentPassword} />
              <AuthInput name="confirmPassword" type="password" placeholder="Confirmar contraseña" error={errors.confirmPassword} />
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-fit">
              <AuthButton text="Registrar" type="submit" variant="default" />
              <AuthButton text="Iniciar sesión" variant="secondary" onClick={() => handleOptionChange?.("login")} hidden={!isMobile && !isTablet} />
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex flex-col items-center gap-4 text-gray-700 text-center max-w-[70%] hidden">
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
  )
}