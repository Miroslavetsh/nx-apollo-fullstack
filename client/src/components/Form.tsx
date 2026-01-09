import type { FormHTMLAttributes, ReactNode } from "react";
import { FormProvider, useFormContext } from "../contexts/FormContext";
import { z } from "@graphql-apollo-course/shared";
import { validateForm } from "../lib/validations";

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: ReactNode;
  onSubmit?: (values: Record<string, string>) => void;
  onValidationError?: (errors: Record<string, string>) => void;
  initialValues?: Record<string, string>;
  schema?: z.ZodSchema<any>;
}

function FormContent({
  children,
  onSubmit,
  onValidationError,
  schema,
  ...formProps
}: Omit<FormProps, "initialValues">) {
  const { state, setErrors } = useFormContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (schema) {
      const errors = validateForm(schema, state);
      if (errors) {
        setErrors(errors);
        onValidationError?.(errors);
        return;
      }
    }

    setErrors({});
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
  onValidationError,
  initialValues = {},
  schema,
  ...formProps
}: FormProps) {
  return (
    <FormProvider initialValues={initialValues}>
      <FormContent
        onSubmit={onSubmit}
        onValidationError={onValidationError}
        schema={schema}
        {...formProps}
      >
        {children}
      </FormContent>
    </FormProvider>
  );
}
