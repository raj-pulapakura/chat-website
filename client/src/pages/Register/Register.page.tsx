import React, { useState } from "react";
import { useRegisterMutation } from "../../graphql/generated";
import { Link, useNavigate } from "react-router-dom";
import { graphqlClient } from "../../graphql/client";
import { useQueryClient } from "react-query";
import { MainForm } from "../../shared/MainForm";
import { Typography } from "@mui/material";

interface RegisterProps {}

export const RegisterPage: React.FC<RegisterProps> = ({}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const queryClient = useQueryClient();
  const {
    mutateAsync: runRegisterMutation,
    isLoading,
    isError,
    error,
  } = useRegisterMutation(graphqlClient, {
    onSuccess: () => {
      queryClient.invalidateQueries("Me");
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameError("");
    setPasswordError("");
    if (!name) {
      return setNameError("Please enter a username");
    }
    if (!password) {
      return setPasswordError("Please enter a password");
    }

    const data = await runRegisterMutation({ name, password });

    if (data?.register.error?.field === "name") {
      return setNameError("A user with that name already exists");
    }

    navigate("/");
  };

  return (
    <MainForm
      onSubmit={onSubmit}
      fields={[
        {
          label: "Name",
          value: name,
          onChange: (e) => setName(e.target.value),
          error: nameError,
        },
        {
          label: "Password",
          type: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          error: passwordError,
        },
      ]}
      title="Register"
      button="Create account"
    >
      <Typography marginTop="1rem" variant="caption" display="block">
        Already have an Account? <Link to="/login">Login</Link>
      </Typography>
    </MainForm>
  );
};
