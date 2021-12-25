import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { graphqlClient } from "../../graphql/client";
import { useCreateRoomMutation, useMeQuery } from "../../graphql/generated";
import { useDispatch } from "react-redux";
import { setCreatedRoomId } from "../../store/room/roomActions";
import { MainForm } from "../../shared/MainForm";

interface CreateRoomStage1Props {}

export const CreateRoomStage1Page: React.FC<CreateRoomStage1Props> = ({}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: meData } = useMeQuery(graphqlClient);
  const { mutateAsync: runCreateRoomMutation } =
    useCreateRoomMutation(graphqlClient);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameError("");
    setDescriptionError("");

    if (!name) {
      return setNameError("Please enter a name");
    }
    if (!description) {
      return setDescriptionError("Please enter a description");
    }
    const data = await runCreateRoomMutation({
      name,
      description,
      creatorId: meData!.me!.id,
    });

    dispatch(setCreatedRoomId(data!.createRoom!.room!.id));
    navigate("/create-room/stage-2/");
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
          label: "Description",
          value: description,
          onChange: (e) => setDescription(e.target.value),
          error: descriptionError,
        },
      ]}
      title="Create a Fresh Room"
      button="Create"
    />
  );
};
