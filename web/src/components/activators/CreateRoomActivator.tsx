import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { graphqlClient } from "../../graphql/client";
import { useCreateRoomMutation, useMeQuery } from "../../graphql/generated";
import { FormSubmitButton } from "../forms/FormSubmitButton";
import { FormTitle } from "../forms/FormTitle";
import { SimpleFormControl } from "../forms/SimpleFormControl";
import { Modal } from "../Modal";

type CreateRoomActivatorProps = {} & ButtonProps;

export const CreateRoomActivator: React.FC<CreateRoomActivatorProps> = ({
  children,
  ...props
}) => {
  const { data: meData } = useMeQuery(graphqlClient);

  const { mutateAsync: createRoom } = useCreateRoomMutation(graphqlClient);

  const [modalVisibility, setModalVisibility] = React.useState(false);

  const [formState, setFormState] = React.useState({
    title: "",
    description: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    title: "",
    description: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!meData?.me.account) {
      return;
    }

    const data = await createRoom({
      input: { ...formState, creatorId: meData.me.account.id },
    });

    if (data.createRoom.error) {
      return setFormErrors({
        ...formErrors,
        [data.createRoom.error.field]: data.createRoom.error.ufm,
      });
    }

    setModalVisibility(false);
  };

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
          <form onSubmit={handleFormSubmit}>
            <FormTitle>Create a room</FormTitle>
            <SimpleFormControl
              value={formState.title}
              error={formErrors.title}
              label="Title"
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
            />
            <SimpleFormControl
              value={formState.description}
              error={formErrors.description}
              label="Description"
              onChange={(e) =>
                setFormState({ ...formState, description: e.target.value })
              }
            />
            <FormSubmitButton color="secondary">Create room</FormSubmitButton>
          </form>
        </Modal>
      )}
    </>
  );
};
