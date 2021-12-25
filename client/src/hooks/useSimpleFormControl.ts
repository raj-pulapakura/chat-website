import { useState } from "react";

export interface SimpleFormControlErrorObj {
  message: string | null;
}

export const useSimpleFormControl = () => {
  const [errorObj, setErrorObj] = useState<SimpleFormControlErrorObj>({
    message: null,
  });
  return { errorObj, setErrorObj };
};
