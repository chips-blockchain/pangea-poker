import React from "react";
import { IInfoRowProps } from "./types";

const InfoRow: React.FunctionComponent<IInfoRowProps> = ({
  label,
  children
}) => {
  return (
    <div className="infoRow">
      <label>{label}</label>
      <div>{children}</div>
    </div>
  );
};

export default InfoRow;
