import { BaseInput } from "./BaseInput";
import { useFormContext } from "../contexts/FormContext";

type FormFieldProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: boolean | null;
  className?: string;
};

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  error,
  className,
}: FormFieldProps) {
  const { state, setField } = useFormContext();

  return (
    <BaseInput
      id={name}
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      value={state[name] || ""}
      onChange={(e) => setField(name, e.target.value)}
      error={error}
      className={className}
    />
  );
}
