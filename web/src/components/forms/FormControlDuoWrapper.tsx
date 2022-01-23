import React from "react";
import { Flex } from "../Flex";

interface FormControlDuoWrapperProps {}

export const FormControlDuoWrapper: React.FC<FormControlDuoWrapperProps> = ({
  children,
}) => {
  return <Flex style={{ gap: "1rem" }}>{children}</Flex>;
};
