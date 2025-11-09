import CheckIndicator from "./CheckIndicator";

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const requirements = [
    {
      label: "Mínimo 6 caracteres",
      condition: password.length >= 6,
    },
    {
      label: "Mínimo 1 letra mayúscula y 1 letra minúscula",
      condition: /^(?=.*[a-z])(?=.*[A-Z])/.test(password),
    },
    {
      label: "Mínimo 1 número",
      condition: /\d/.test(password),
    },
    {
      label: "Mínimo 1 carácter especial (ej: @, $, !, %, *, ?, &...)",
      condition: /[@$!%*?&]/.test(password),
    },
  ]
  return (
    <div className="flex flex-col gap-4">
      {
        requirements.map((req, index) => (
          <CheckIndicator key={index} label={req.label} complete={req.condition} />
        ))
      }
    </div>
  )
}