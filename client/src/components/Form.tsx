import type { FormHTMLAttributes, ReactNode } from "react";
import { FormProvider, useFormContext } from "../contexts/FormContext";

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: ReactNode;
  onSubmit?: (values: Record<string, string>) => void;
  initialValues?: Record<string, string>;
}

function FormContent({
  children,
  onSubmit,
  ...formProps
}: Omit<FormProps, "initialValues">) {
  const { state } = useFormContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(state);
  };

  return (
    <form {...formProps} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export function Form({
  children,
  onSubmit,
  initialValues = {},
  ...formProps
}: FormProps) {
  return (
    <FormProvider initialValues={initialValues}>
      <FormContent onSubmit={onSubmit} {...formProps}>
        {children}
      </FormContent>
    </FormProvider>
  );
}
