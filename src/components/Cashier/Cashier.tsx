import React from "react";
import Modal from "../Modal";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import { Button } from "../Controls";
import { sendMessage } from "../../store/actions";
import { updateStateValue } from "../../store/actions";
import { IState } from "../../store/types";
import { CashierButton } from "./assets/style";
import { Node } from "../../lib/constants";
// This modal opens up when the player clicks the Cashier button and allows the player to
// move funds to and away from the account

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
}

const Cashier: React.FunctionComponent<IProps> = ({ dispatch, state }) => {
  const openCashierModal = (): void => {
    updateStateValue("isCashierOpen", true, dispatch);
  };

  // Close the Cashier modal
  const closeCashierModal = () => (): void => {
    updateStateValue("isCashierOpen", false, dispatch);
  };

  const sendWithdrawRequest = (): void => {
    sendMessage(
      {
        method: "withdrawRequest"
      },
      state,
      dispatch
    );
  };

  const handleCashierButtonClick = () => (): void => {
    openCashierModal();
    // sendWithdrawRequest();
  };

  return (
    <React.Fragment>
      {!state.isStartupModal && state.nodeType !== "dealer" && (
        <CashierButton>
          <Button
            label="Cashier"
            disabled={!state.backendStatus}
            onClick={handleCashierButtonClick()}
            small
            testId="cashier-button"
          />
        </CashierButton>
      )}
      <Modal
        isOpen={state.isCashierOpen}
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
          },
          {
            content: (
              <Withdraw
                dispatch={dispatch}
                state={state}
                closeCashierModal={closeCashierModal}
              />
            ),
            name: "Withdraw",
            title: "Withdraw CHIPS"
          }
        ]}
      />
    </React.Fragment>
  );
};

export default Cashier;
