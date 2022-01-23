import { Button, ButtonProps, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { graphqlClient } from "../../graphql/client";
import {
  useAccountByUsernameQuery,
  useCreateInviteRequestMutation,
  useMeQuery,
  useRoomQuery,
} from "../../graphql/generated";
import { StoreState } from "../../store";
import { appTheme } from "../../theme";
import { FormSubmitButton } from "../forms/FormSubmitButton";
import { FormTitle } from "../forms/FormTitle";
import { SimpleFormControl } from "../forms/SimpleFormControl";
import { Modal } from "../Modal";
import { Spacing } from "../Spacing";

type InviteUserButtonProps = {} & ButtonProps;

export const InviteUserButton: React.FC<InviteUserButtonProps> = ({
  children,
  ...props
}) => {
  const [username, setUsername] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [modalVisibility, setModalVisibility] = React.useState(false);

  const roomId = useSelector<StoreState>(
    (state) => state.room.currentRoomId
  ) as StoreState["room"]["currentRoomId"];

  const { data: roomData } = useRoomQuery(graphqlClient, { roomId });

  const { data: meData } = useMeQuery(graphqlClient);
  const { refetch: queryAccount } = useAccountByUsernameQuery(
    graphqlClient,
    {
      username,
    },
    { enabled: !!username }
  );

  useEffect(() => {
    setUsernameError("");
  }, [username]);

  const { mutateAsync: sendInviteRequest, isLoading: inviteRequestIsLoading } =
    useCreateInviteRequestMutation(graphqlClient);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!meData?.me.account) {
      return;
    }

    const { data } = await queryAccount();

    if (data?.accountByUsername.error || !data?.accountByUsername.account) {
      return setUsernameError(
        "We couldn't find a user with that username. Please try again."
      );
    }

    const senderId = meData.me.account.id;
    const recepientId = data.accountByUsername.account.id;

    const response = await sendInviteRequest({
      input: { senderId, recepientId, roomId },
    });

    console.log(response);

    if (response.createInviteRequest.error) {
      return setUsernameError(response.createInviteRequest.error.ufm);
    }

    setUsername("");
    setModalVisibility(false);
  }

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
            <FormTitle>
              Invite someone to{" "}
              <span style={{ color: appTheme.palette.secondary.main }}>
                {roomData?.room?.room?.title}
              </span>
            </FormTitle>
            <SimpleFormControl
              value={username}
              error={usernameError}
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormSubmitButton color="secondary">Send Invite</FormSubmitButton>
            <Spacing height="1rem" />
            <Typography textAlign="left" sx={{ color: grey[400] }}>
              Once you send an invite, the user must accept it on their
              interface for them to join your room. You will be notified when
              this happens.
            </Typography>
          </form>
        </Modal>
      )}
    </>
  );
};
