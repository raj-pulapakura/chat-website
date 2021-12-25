import React, { useState } from "react";
import { useLoginMutation } from "../../graphql/generated";
import { Link, useNavigate } from "react-router-dom";
import { graphqlClient } from "../../graphql/client";
import { useQueryClient } from "react-query";
import { MainForm } from "../../shared/MainForm";
import { Typography } from "@mui/material";

interface LoginProps {}

export const LoginPage: React.FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const queryClient = useQueryClient();
  const { mutateAsync: runLoginMutation } = useLoginMutation(graphqlClient, {
    onSuccess: () => {
      queryClient.invalidateQueries("Me");
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameError("");
    setPasswordError("");

    if (!name) {
      setNameError("Please enter a name");
    }
    if (!password) {
      setPasswordError("Please enter a password");
    }
    const data = await runLoginMutation({ name, password });

    if (data?.login.error) {
      setNameError("Incorrect username or password");
      setPasswordError("Incorrect username or password");
    }
    navigate("/");
  };

  return (
    <MainForm
      onSubmit={onSubmit}
      fields={[
        {
          label: "Name",
          type: "text",
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
      title="Login"
      button="Login"
    >
      <Typography marginTop="1rem" variant="caption" display="block">
        Don't have an Account? <Link to="/register">Register</Link>
      </Typography>
    </MainForm>
  );
};
