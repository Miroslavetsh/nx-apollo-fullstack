import { BaseInput } from "./BaseInput";
import { useFormContext } from "../contexts/FormContext";

type FormFieldProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  className,
}: FormFieldProps) {
  const { state, errors, setField } = useFormContext();
  const error = errors[name];
  const hasError = !!error;

  return (
    <BaseInput
      id={name}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      value={state[name] || ""}
      onChange={(e) => setField(name, e.target.value)}
      error={hasError}
      errorMessage={error}
      className={className}
    />
  );
}
