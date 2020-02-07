import React from "react";
import Modal from "../Modal";
import Deposit from "./Deposit";

import { IState } from "../../store/initialState";

// This is the modal that appears at the startup and let's the user to join a table

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
}

const Cashier: React.FunctionComponent<IProps> = ({ dispatch, state }) => {
  return (
    <Modal
      tabs={[
        {
          title: "Deposit",
          content: <Deposit dispatch={dispatch} state={state} />
        }
        // {
        //   title: "Withdraw",
        //   content: <Withdraw />
        // }
      ]}
    />
  );
};

export default Cashier;
