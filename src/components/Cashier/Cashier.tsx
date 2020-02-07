import React from "react";
import Modal from "../Modal";
import Deposit from "./Deposit";

import { IState } from "../../store/initialState";

// This modal opens up when the player clicks the Cashier button and allows the player to
// move funds to and away from the account

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
}

const Cashier: React.FunctionComponent<IProps> = ({ dispatch, state }) => {
  return (
    <Modal
      tabs={[
        {
          content: <Deposit dispatch={dispatch} state={state} />,
          name: "Deposit",
          title: "Deposit CHIPS"
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
