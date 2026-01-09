export { userSchema, type UserFormData } from "@graphql-apollo-course/shared";
import { z } from "@graphql-apollo-course/shared";

export function validateForm(
  schema: z.ZodSchema<any>,
  values: Record<string, string>
): Record<string, string> | null {
  const result = schema.safeParse(values);

  if (result.success) {
    return null;
  }

  const errors: Record<string, string> = {};
  result.error.errors.forEach((err: z.ZodIssue) => {
    if (err.path[0]) {
      errors[err.path[0].toString()] = err.message;
    }
  });

  return errors;
}
