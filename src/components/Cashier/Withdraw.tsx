import React, { useContext, useEffect, useState } from "react";
import { IBalance, IProps } from "./types";
import { Status } from "../../lib/constants";
import "./assets/style.css";

import WithdrawalResult from "./WithdrawalResult";
import { DispatchContext, StateContext } from "../../store/context";
import WithdrawalConfirmation from "./WithdrawalConfirmation";
import WithdrawalForm from "./WithdrawalForm";
import { withdraw } from "../../store/actions";
import { IState } from "../../store/types";
import displayBalanceDecimals from "../../lib/balanceWithDecimals";

const steps = {
  STEP1: "Input",
  STEP2: "ConfirmationDialog",
  STEP3: "Confirmation"
};
const Withdraw: React.FunctionComponent<IProps> = ({ closeCashierModal }) => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const { latestTransactionId } = useContext(StateContext);
  const [amountToWithdraw, setAmountToWithdraw] = useState<IBalance>(
    displayBalanceDecimals(5)
  );
  const [withdrawAddress, setWithdrawAddress] = useState(
    "RMwqv9VNBu7wjrEvQtMrYX7c6ddogyStBG"
  );
  const [withdrawStatus, setWithdrawStatus] = useState(Status.Initial);
  const [step, setStep] = useState(steps.STEP2);

  useEffect(() => {
    if (latestTransactionId) {
      setWithdrawStatus(Status.Success);
    }
  }, [latestTransactionId]);

  const goBack = (): void => setStep(steps.STEP1);

  /****** HANDLER ON WITHDRAWAL PROCEED ******/
  // potential optimization if there are speed issues
  // https://reactjs.org/docs/hooks-reference.html#usecallback
  const goForward = (): void => {
    withdraw(withdrawAddress, Number(amountToWithdraw), state, dispatch);
    setWithdrawStatus(Status.Processing);
    setStep(steps.STEP3);
  };

  /****** HANDLER ON WITHDRAWAL CONFIRMATION ******/

  const onSubmit = (data): void => {
    if (data["withdraw-amount"] && data["withdraw-address"]) {
      setAmountToWithdraw(data["withdraw-amount"]);
      setWithdrawAddress(data["withdraw-address"]);
      setStep(steps.STEP2);
    } else {
      alert("There as been an unexpected Error");
    }
  };

  return (
    <div>
      {step === steps.STEP1 && (
        <WithdrawalForm
          onSubmitForm={onSubmit}
          closeCashierModal={closeCashierModal}
          address={withdrawAddress}
          amount={amountToWithdraw}
        />
      )}
      {step === steps.STEP2 && (
        <WithdrawalConfirmation
          amount={amountToWithdraw}
          back={goBack}
          goForward={goForward}
          address={withdrawAddress}
        />
      )}
      {step === steps.STEP3 && (
        <WithdrawalResult
          latestTransactionId={latestTransactionId}
          amount={amountToWithdraw}
          address={withdrawAddress}
          withdrawStatus={withdrawStatus}
          closeCashierModal={closeCashierModal}
        />
      )}
    </div>
  );
};

export default Withdraw;
