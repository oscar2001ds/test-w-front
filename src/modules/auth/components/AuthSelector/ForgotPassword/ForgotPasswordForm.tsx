"use client";

import { Form, Formik } from "formik";
import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";
import { AuthFormPreviewProps } from "../../../types/auth.types";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Button } from "@shared/components/ui/button";
import * as Yup from 'yup';

const ForgotPasswordFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
});

export default function ForgotPasswordForm({ handleOptionChange }: AuthFormPreviewProps) {
  return (
    <div className="w-full h-full">
      <Button
        variant="ghost"
        onClick={() => handleOptionChange?.("login")}
        startIcon={<RiArrowGoBackFill size={20} />}
        className="text-lg font-semibold cursor-pointer mt-6 mx-6 items-center gap-2 flex lg:hidden"
      >
        Volver a inicio de sesión
      </Button>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotPasswordFormValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          console.log("✅ Formulario enviado con valores:", values);
          setSubmitting(false);
        }}
      >
        {({ errors }) => (
          <Form className="flex flex-col gap-10 w-full items-center p-6 px-10 lg:px-20">
            <h2 className="text-4xl font-bold">¿Olvidaste tu contraseña?</h2>
            <p>
              No te preocupes, ingresa el correo vinculado a tu cuenta y te enviaremos las instrucciones para recuperar tu contraseña.
            </p>
            <div className="flex flex-col gap-6 w-full">
              <AuthInput name="email" placeholder="Correo electrónico" error={errors.email} />
            </div>
            <AuthButton text="Enviar correo" type="submit" variant="default" />
          </Form>
        )}
      </Formik>
    </div>
  )
}