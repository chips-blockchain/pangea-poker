import React from "react";
import Modal from "./Modal";
import CustomIP from "./CustomIP";
import TableSelect from "./TableSelect";
import { IState } from "../../store/initialState";

// This is the modal that appears at the startup and let's the user to join a table

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
}

const StartupModal: React.FunctionComponent<IProps> = ({ dispatch, state }) => {
  return (
    <Modal
      tabs={[
        {
          title: "Table List",
          content: <TableSelect dispatch={dispatch} state={state} />
        },
        {
          title: "Custom IP",
          content: <CustomIP />
        }
      ]}
    />
  );
};

export default StartupModal;