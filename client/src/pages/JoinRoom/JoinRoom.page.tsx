import React, { useState } from "react";
import { useJoinRoomMutation, useMeQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { useNavigate } from "react-router-dom";
import { MainForm } from "../../shared/MainForm";

interface JoinRoomProps {}

export const JoinRoomPage: React.FC<JoinRoomProps> = ({}) => {
  const [roomPublicId, setRoomPublicId] = useState("");
  const [roomIdError, setRoomIdError] = useState("");
  const navigate = useNavigate();

  const { data: meData } = useMeQuery(graphqlClient);

  const { mutateAsync: runJoinRoomMutation } =
    useJoinRoomMutation(graphqlClient);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRoomIdError("");

    if (!roomPublicId) {
      return setRoomIdError("Please enter an ID");
    }

    const data = await runJoinRoomMutation({
      publicId: roomPublicId,
      userId: meData?.me?.id as string,
    });

    if (data.joinRoom.error) {
      return setRoomIdError(data.joinRoom.error.resp);
    }

    navigate("/");
  };

  return (
    <MainForm
      onSubmit={onSubmit}
      fields={[
        {
          label: "Enter the ID of the room",
          value: roomPublicId,
          onChange: (e) => setRoomPublicId(e.target.value),
          error: roomIdError,
        },
      ]}
      title="Join a Room"
      button="Bring on the fun"
    />
  );
};
