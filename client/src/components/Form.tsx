import type { FormHTMLAttributes, ReactNode } from "react";
import { FormProvider, useFormContext } from "../contexts/FormContext";
import { z } from "zod";

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

    // TODO: Move this to validation utility function (not hook)
    if (schema) {
      const result = schema.safeParse(state);
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.errors.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
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
