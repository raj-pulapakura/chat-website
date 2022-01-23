import React, { HTMLAttributes } from "react";

type DeadCenterProps = {} & HTMLAttributes<HTMLDivElement>;

export const DeadCenter: React.FC<DeadCenterProps> = ({
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        transform: "translate(-50%, -50%)",
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};
