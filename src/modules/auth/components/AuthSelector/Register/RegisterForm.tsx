"use client";

import { Form, Formik } from "formik";
import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";
import { GrFacebookOption } from "react-icons/gr";
import { Button } from "@/src/shared/components/ui/button";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { AuthFormPreviewProps } from "../../../types/auth.types";
import { useBreakpoints } from "@/src/core";
import * as Yup from 'yup';
import { useToast } from "@/src/shared";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/core/context/AuthContext";

const SetPasswordFormValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'El nombre de usuario debe tener al menos 2 caracteres')
    .required('El nombre de usuario es obligatorio'),
  firstName: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es obligatorio'),
  lastName: Yup.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
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

export default function RegisterForm({ handleOptionChange }: AuthFormPreviewProps) {
  const router = useRouter();
  const { register } = useAuth();
  const { isMobile, isTablet } = useBreakpoints();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (values: any, setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      await register({
        username: values.username,
        email: values.email,
        password: values.currentPassword,
        firstName: values.firstName,
        lastName: values.lastName
      });
      showSuccess("Registro exitoso");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        showError(`${error.message}`);
      } else {
        showError("Error desconocido en el registro");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full h-full p-10 items-center">
      <Formik
        initialValues={{
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          currentPassword: "",
          confirmPassword: ""
        }}
        validationSchema={SetPasswordFormValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-10 w-full items-center">
            <h2 className="text-4xl font-bold">Regístrate</h2>
            <div className="flex flex-col gap-4 w-full">
              <AuthInput
                name="username"
                placeholder="Nickname"
                error={errors.username}
                autoComplete="given-name"
              />
              <AuthInput
                name="email"
                placeholder="Correo electrónico"
                error={errors.email}
                autoComplete="email"
              />
              <div className="flex gap-4 w-full">
                <AuthInput
                  name="firstName"
                  placeholder="Nombre"
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <AuthInput
                  name="lastName"
                  placeholder="Apellido"
                  error={errors.lastName}
                  autoComplete="family-name"
                />
              </div>
              <div className="flex gap-4 w-full">

                <AuthInput
                  name="currentPassword"
                  type="password"
                  placeholder="Contraseña"
                  error={errors.currentPassword}
                  autoComplete="new-password"
                />
                <AuthInput
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmar contraseña"
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-fit">
              <AuthButton text="Registrar" type="submit" variant="default" isLoading={isSubmitting} />
              <AuthButton text="Iniciar sesión" variant="secondary" onClick={() => handleOptionChange?.("login")} hidden={!isMobile && !isTablet} />
            </div>
          </Form>
        )}
      </Formik>
      <div className="hidden flex-col items-center gap-4 text-gray-700 text-center max-w-[70%]">
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