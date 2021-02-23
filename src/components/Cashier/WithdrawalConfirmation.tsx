import React from "react";
import { Button } from "../Controls";
import { IWithdrawalConfirmationProps } from "./types";
import "./assets/style.css";

const WithdrawalConfirmation: React.FunctionComponent<IWithdrawalConfirmationProps> = ({
  amount,
  address,
  back,
  goForward
}) => {
  return (
    <div>
      <h1>Please confirm your transaction</h1>

      <h2>
        You are withdrawing {amount} CHIPS to {address}. Is that correct?
      </h2>
      <div className="cashierButtons">
        <Button label="Back" onClick={back} />
        <Button label="Confirm" onClick={goForward} />)
      </div>
    </div>
  );
};

export default WithdrawalConfirmation;
