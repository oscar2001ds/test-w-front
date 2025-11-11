import { Field } from "formik";
import { Label } from "../../../../shared/components/ui/label";
import { Input } from "../../../../shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/components/ui/select";
import { AlertCircle } from 'lucide-react';

interface SimulationInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  min?: string | number;
  step?: string | number;
  options?: readonly { readonly value: string; readonly label: string }[] | { value: string | number; label: string }[];
}

export function SimulationInput({ 
  label, 
  name, 
  type = "text", 
  placeholder, 
  error, 
  disabled = false,
  min,
  step,
  options
}: SimulationInputProps) {
  if (options) {
    return (
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <Field name={name}>
          {({ field, form }: any) => (
            <Select
              value={field.value || ''}
              onValueChange={(value) => form.setFieldValue(name, value)}
              disabled={disabled}
            >
              <SelectTrigger className={error ? 'border-red-500' : ''}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Field>
        {error && (
          <div className="flex items-center gap-1 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Field name={name}>
        {({ field }: any) => (
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            step={step}
            className={error ? 'border-red-500' : ''}
          />
        )}
      </Field>
      {error && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
}