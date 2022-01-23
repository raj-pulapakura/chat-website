import React, { useState } from "react";
import { graphqlClient } from "../../graphql/client";
import { useRegisterMutation } from "../../graphql/generated";
import { useNavigate } from "react-router-dom";
import { PrimeWrapper } from "../../components/PrimeWrapper";
import { Typography } from "@mui/material";
import { FormTitle } from "../../components/forms/FormTitle";
import { SimpleFormControl } from "../../components/forms/SimpleFormControl";
import { FormSubmitButton } from "../../components/forms/FormSubmitButton";
import { routes } from "../../features/AppRouter/_index";

interface RegisterPageProps {}

export const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  const navigate = useNavigate();

  const { mutateAsync: register } = useRegisterMutation(graphqlClient);

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // setFormErrors({ username: "", password: "" });

    e.preventDefault();

    console.log("hello");

    const data = await register({ input: formState });

    console.log(data);

    if (data.register.error) {
      return setFormErrors({
        ...formErrors,
        [data.register.error.field]: data.register.error.ufm,
      });
    }

    navigate(routes.home.path);
  };

  return (
    <PrimeWrapper>
      <form onSubmit={handleFormSubmit}>
        <FormTitle>Register</FormTitle>
        <SimpleFormControl
          value={formState.username}
          error={formErrors.username}
          label="Username"
          onChange={(e) =>
            setFormState({ ...formState, username: e.target.value })
          }
        />
        <SimpleFormControl
          value={formState.password}
          error={formErrors.password}
          type="password"
          label="Password"
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
        <FormSubmitButton color="secondary">Register</FormSubmitButton>
      </form>
    </PrimeWrapper>
  );
};
