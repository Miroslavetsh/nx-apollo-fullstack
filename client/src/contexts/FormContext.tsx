import { createContext, useContext, useReducer, type ReactNode } from "react";

type FormState = {
  [key: string]: string;
};

type FormErrors = {
  [key: string]: string | undefined;
};

type FormAction =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "CLEAR_ERROR"; field: string }
  | { type: "RESET_FORM" }
  | { type: "SET_FORM"; form: FormState };

type FormContextType = {
  state: FormState;
  errors: FormErrors;
  setField: (field: string, value: string) => void;
  setErrors: (errors: FormErrors) => void;
  clearError: (field: string) => void;
  resetForm: () => void;
  setForm: (form: FormState) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

type FormReducerState = {
  state: FormState;
  errors: FormErrors;
};

function formReducer(
  currentState: FormReducerState,
  action: FormAction
): FormReducerState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...currentState,
        state: {
          ...currentState.state,
          [action.field]: action.value,
        },
        errors: {
          ...currentState.errors,
          [action.field]: undefined,
        },
      };
    case "SET_ERRORS":
      return {
        ...currentState,
        errors: action.errors,
      };
    case "CLEAR_ERROR":
      return {
        ...currentState,
        errors: {
          ...currentState.errors,
          [action.field]: undefined,
        },
      };
    case "RESET_FORM":
      return { state: {}, errors: {} };
    case "SET_FORM":
      return {
        ...currentState,
        state: action.form,
        errors: {},
      };
    default:
      return currentState;
  }
}

type FormProviderProps = {
  children: ReactNode;
  initialValues?: FormState;
};

export function FormProvider({
  children,
  initialValues = {},
}: FormProviderProps) {
  const [{ state, errors }, dispatch] = useReducer(formReducer, {
    state: initialValues,
    errors: {},
  });

  const setField = (field: string, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const setErrors = (errors: FormErrors) => {
    dispatch({ type: "SET_ERRORS", errors });
  };

  const clearError = (field: string) => {
    dispatch({ type: "CLEAR_ERROR", field });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const setForm = (form: FormState) => {
    dispatch({ type: "SET_FORM", form });
  };

  return (
    <FormContext.Provider
      value={{
        state,
        errors,
        setField,
        setErrors,
        clearError,
        resetForm,
        setForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
