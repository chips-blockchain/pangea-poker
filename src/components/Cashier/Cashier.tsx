import React from "react";
import styled from "@emotion/styled";
import Modal from "../Modal";
import Deposit from "./Deposit";
import { Button } from "../Controls";
import { updateStateValue } from "../../store/actions";
import { IState } from "../../store/initialState";

// This modal opens up when the player clicks the Cashier button and allows the player to
// move funds to and away from the account

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
}

const CashierButton = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 0.5rem;
  z-index: 998;
`;

const Cashier: React.FunctionComponent<IProps> = ({ dispatch, state }) => {
  const openCashierModal = () => (): void => {
    updateStateValue("isCashierOpen", true, dispatch);
  };

  // Close the Cashier modal
  const closeCashierModal = () => (): void => {
    updateStateValue("isCashierOpen", false, dispatch);
  };

  return (
    <React.Fragment>
      {!state.isStartupModal && state.nodeType !== "dealer" && (
        <CashierButton>
          <Button label="Cashier" onClick={openCashierModal()} small></Button>
        </CashierButton>
      )}
      <Modal
        isOpen={state.isCashierOpen}
        // Pass in onRequestClose to allow closing the modal with "ESC" keypress
        // or by clicking on the overlay
        id="cashier-modal"
        contentLabel="Cashier Modal"
        onRequestClose={closeCashierModal()}
        tabs={[
          {
            content: (
              <Deposit
                dispatch={dispatch}
                state={state}
                closeCashierModal={closeCashierModal}
              />
            ),
            name: "Deposit",
            title: "Deposit CHIPS"
          }
          // Withdrawal tab will be placed here
        ]}
      />
    </React.Fragment>
  );
};

export default Cashier;
