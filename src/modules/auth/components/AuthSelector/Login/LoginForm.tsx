"use client";

import { Form, Formik, Field } from "formik";
import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import { Label } from "@/src/shared/components/ui/label";
import { GrFacebookOption } from "react-icons/gr";
import { Button } from "@/src/shared/components/ui/button";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { AuthFormPreviewProps } from "../../../types/auth.types";
import { useBreakpoints } from "@/src/core";
import { useToast } from "@/src/shared/hooks";
import * as Yup from 'yup';
import { useAuth } from "@/src/core/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
  currentPassword: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export default function LoginForm({ handleOptionChange }: AuthFormPreviewProps) {
  const router = useRouter();
  const { login } = useAuth();
  const { isMobile, isTablet } = useBreakpoints();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (
    values: {
      email: string;
      remember: boolean;
      currentPassword: string
    },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      await login({
        email: values.email,
        remember: values.remember,
        password: values.currentPassword,
      });
      showSuccess("¡Inicio de sesión exitoso!");
      router.push("/financial-simulator/home");
    } catch (error) {
      if (error instanceof Error) {
        showError(`${error.message}`);
      } else {
        showError("Error al iniciar sesión. Verifica tus credenciales.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full h-full py-10 px-14 items-center">
      <Formik
        initialValues={{
          email: "",
          remember: false,
          currentPassword: ""
        }}
        validationSchema={LoginFormValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-10 w-full items-center">
            <h2 className="text-4xl font-bold">Inicia sesión</h2>
            <div className="flex flex-col gap-4 w-full">
              <AuthInput
                name="email"
                placeholder="Correo electrónico"
                error={errors.email}
                autoComplete="email"
              />
              <AuthInput
                name="currentPassword"
                type="password"
                placeholder="Contraseña"
                error={errors.currentPassword}
                autoComplete="current-password"
              />
              <div className="flex items-center justify-between gap-10">
                <div className="flex items-center gap-2">
                  <Field name="remember">
                    {({ field, form }: any) => (
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={(checked) => form.setFieldValue('remember', checked)}
                      />
                    )}
                  </Field>
                  <Label htmlFor="remember">Recuerdame</Label>
                </div>
                <a onClick={() => handleOptionChange?.("forgotPassword")} className="text-sm cursor-pointer hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-fit">
              <AuthButton text="Iniciar sesión" type="submit" variant="default" isLoading={isSubmitting} />
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