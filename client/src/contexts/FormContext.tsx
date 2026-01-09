import { createContext, useContext, useReducer, type ReactNode } from "react";

type FormState = {
  [key: string]: string;
};

type FormAction =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "RESET_FORM" }
  | { type: "SET_FORM"; form: FormState };

type FormContextType = {
  state: FormState;
  setField: (field: string, value: string) => void;
  resetForm: () => void;
  setForm: (form: FormState) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return {};
    case "SET_FORM":
      return action.form;
    default:
      return state;
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
  const [state, dispatch] = useReducer(formReducer, initialValues);

  const setField = (field: string, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const setForm = (form: FormState) => {
    dispatch({ type: "SET_FORM", form });
  };

  return (
    <FormContext.Provider value={{ state, setField, resetForm, setForm }}>
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
