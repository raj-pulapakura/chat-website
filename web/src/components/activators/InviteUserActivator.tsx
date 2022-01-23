import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { graphqlClient } from "../../graphql/client";
import { useMeQuery } from "../../graphql/generated";
import { FormSubmitButton } from "../forms/FormSubmitButton";
import { FormTitle } from "../forms/FormTitle";
import { SimpleFormControl } from "../forms/SimpleFormControl";
import { Modal } from "../Modal";

type InviteUserActivatorProps = {} & ButtonProps;

export const InviteUserActivator: React.FC<InviteUserActivatorProps> = ({
  children,
  ...props
}) => {
  const { data: meData } = useMeQuery(graphqlClient);

  const [modalVisibility, setModalVisibility] = React.useState(false);

  const [formState, setFormState] = React.useState({
    username: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    username: "",
  });

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        {...props}
        onClick={() => setModalVisibility(true)}
      >
        {children}
      </Button>
      {modalVisibility && (
        <Modal onClose={() => setModalVisibility(false)}>
          <form>
            <FormTitle>Invite</FormTitle>
            <SimpleFormControl
              value={formState.username}
              error={formErrors.username}
              label="Username"
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
            />
            <FormSubmitButton color="secondary">Send Invite</FormSubmitButton>
          </form>
        </Modal>
      )}
    </>
  );
};
