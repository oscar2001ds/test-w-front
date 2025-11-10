"use client";

import { Form, Formik } from "formik";
import * as Yup from 'yup';
import AuthInput from "../AuthSelector/common/AuthInput";
import AuthButton from "../AuthSelector/common/AuthButton";
import PasswordStrengthMeter from "./PasswordStrengthMeter";


export const SetPasswordFormValidationSchema = Yup.object().shape({
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


export default function SetPasswordForm() {
  return (
    <div data-aos="zoom-in" className="flex flex-col w-[90%] max-w-[700px] gap-8 py-10 px-14 items-center rounded-4xl shadow-2xl overflow-hidden bg-secondary">
      <Formik
        initialValues={{
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
        {
          ({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="flex flex-col gap-10 w-full items-center">
              <h2 className="text-4xl font-bold">Establece tu nueva contraseña</h2>
              <div className="flex flex-col gap-6 w-full">
                <AuthInput 
                  name="currentPassword" 
                  type="password" 
                  placeholder="Contraseña actual" 
                  error={touched.currentPassword && errors.currentPassword ? errors.currentPassword : undefined}
                  autoComplete="new-password"
                />
                <PasswordStrengthMeter password={values.currentPassword} />
                <AuthInput 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="Confirmar contraseña" 
                  error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex flex-col gap-4 w-full sm:w-fit">
                <AuthButton text="Continuar" type="submit" variant="default" />
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  );
}