import React, { useState } from "react";
import { FormSubmitButton } from "../../components/forms/FormSubmitButton";
import { FormTitle } from "../../components/forms/FormTitle";
import { SimpleFormControl } from "../../components/forms/SimpleFormControl";
import { PrimeWrapper } from "../../components/PrimeWrapper";
import { routes } from "../../features/AppRouter/_index";
import { graphqlClient } from "../../graphql/client";
import { useLoginMutation } from "../../graphql/generated";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const navigate = useNavigate();

  const { mutateAsync: login } = useLoginMutation(graphqlClient);

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

    const data = await login({ input: formState });

    console.log(data);

    if (data.login.error) {
      return setFormErrors({
        ...formErrors,
        [data.login.error.field]: data.login.error.ufm,
      });
    }

    navigate(routes.home.path);
  };

  return (
    <PrimeWrapper>
      <form onSubmit={handleFormSubmit}>
        <FormTitle>Login</FormTitle>
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
          label="Password"
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
        <FormSubmitButton color="secondary">Login</FormSubmitButton>
      </form>
    </PrimeWrapper>
  );
};
