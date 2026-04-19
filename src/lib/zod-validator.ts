import { ZodSchema, typeToFlattenedError } from "zod";

type ValidationSuccess<T> = { success: true; data: T };
type ValidationFailure = {
  success: false;
  errors: typeToFlattenedError<unknown>;
};

export function validateSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): ValidationSuccess<T> | ValidationFailure {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  return {
    success: true,
    data: parsed.data,
  };
}
