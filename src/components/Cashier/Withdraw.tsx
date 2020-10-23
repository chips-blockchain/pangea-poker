import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import isValidAddress from "../../lib/isValidAddress";
import displayBalanceDecimals from "../../lib/balanceWithDecimals";
import { getTotal, inputIsValid } from "./helpers";
import { IBalance, IProps } from "./types";
import { Status } from "../../lib/constants";

import { css } from "@emotion/core";
import { Button } from "../Controls";
import { Input } from "../Form";
import InputWithButton from "../Form/InputWIthButton";
import "./assets/style.css";
import { Balance, ErrorMessage, InputWrapper } from "./assets/style";
import { customInputStyle, customLabelStyle } from "../Form/assets/style";

import WithdrawalResult from "./WithdrawalResult";
import { withdraw } from "../../store/actions";
import { DispatchContext } from "../../store/context";

const Withdraw: React.FunctionComponent<IProps> = ({
  state,
  closeCashierModal
}) => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const { balance, transactionFee, latestTransactionId } = state;
  const [amountToWithdraw, setAmountToWithdraw] = useState<IBalance>(0);
  const [difference, setDifference] = useState(0);
  const [addressError, setAddressError] = useState(" ");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawStatus, setWithdrawStatus] = useState(Status.Initial);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (latestTransactionId) {
      setWithdrawStatus(Status.Success);
    }
  }, [latestTransactionId]);

  const setWithdrawAmount = (amount: string | number): void =>
    setAmountToWithdraw(displayBalanceDecimals(amount));

  const setDifferenceAmount = (amount: string | number): void =>
    setDifference(
      Number(displayBalanceDecimals(getTotal(amount, transactionFee)))
    );

  const setAmount = (amount: string | number): void => {
    setWithdrawAmount(amount);
    setDifferenceAmount(amount);
  };

  const setMaxAmount = () => (): void => setAmount(balance);

  /****** HANDLERS ******/

  const onSubmit = (): void => {
    withdraw(withdrawAddress, Number(amountToWithdraw), state, dispatch);
    setWithdrawStatus(Status.Processing);
  };

  const handleAmountInput = () => (e): void => {
    if (inputIsValid(e.target.value)) {
      setAmountToWithdraw(Number(e.target.value));
    }
  };

  const handleOnBlur = () => (e): void => {
    if (e.target.value > balance) {
      setWithdrawAmount(balance);
      setDifferenceAmount(0);
      return;
    }
    setWithdrawAmount(e.target.value);
  };

  // Handle address input
  const handleAddressInput = () => (e): void => {
    setAddressError(" ");
    setWithdrawAddress(e.target.value);
  };

  const onAddressBlur = () => (e): void => {
    if (!isValidAddress(e.target.value)) {
      setAddressError("The specified address is invalid.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test="withdraw-tab">
      {withdrawStatus ? (
        <div>
          <WithdrawalResult
            latestTransactionId={latestTransactionId}
            withdrawStatus={withdrawStatus}
            amount={String(amountToWithdraw)}
            address={withdrawAddress}
          />
          <Button
            label="Close"
            onClick={closeCashierModal()}
          />
        </div>
      ) : (
        <React.Fragment>
          <Balance data-test="withdraw-balance">
            Available: {displayBalanceDecimals(balance)} CHIPS
          </Balance>
          <InputWrapper>
            <InputWithButton
              data-test="withdraw-amount"
              buttonLabel="Max"
              forwardRef={register({ required: true })}
              handleButtonClick={setMaxAmount()}
              label="Enter amount"
              min={0}
              max={balance}
              name="withdraw-amount"
              onChange={handleAmountInput()}
              onBlur={handleOnBlur()}
              step={0.00000001}
              type="number"
              value={amountToWithdraw}
            />
            <Input
              data-test="withdraw-address"
              customStyle={customInputStyle}
              customLabelStyle={customLabelStyle}
              forwardRef={register({ required: true })}
              label="CHIPS address"
              name={"withdraw-address"}
              onChange={handleAddressInput()}
              onBlur={onAddressBlur()}
              placeholder=""
              required={true}
              type="string"
              value={withdrawAddress}
            />
            <ErrorMessage>
              {addressError}
              {errors["withdraw-amount"] && "Please set a withdaw amount"}
            </ErrorMessage>
            <div id="cashierInfo">
              <div className="infoLine">
                <h5>Fee</h5>
                <div>{displayBalanceDecimals(transactionFee)} CHIPS</div>
              </div>
              <div className="infoLine">
                <h5>Total</h5>
                <div>{difference} CHIPS</div>
              </div>
            </div>
          </InputWrapper>
          <div className="cashierButtons">
            <Button
              label="Close"
              onClick={closeCashierModal()}
              data-test="close-button-cashier-withdraw"
            />
            {withdrawStatus !== Status.Success && (
              <Button
                css={css`
                  display: none;
                `}
                label="Withdraw"
                data-test="withdraw-button"
                isHighlighted
                isSubmit
                disabled={
                  !amountToWithdraw ||
                  !withdrawAddress ||
                  withdrawStatus === Status.Processing
                }
              />
            )}
          </div>
        </React.Fragment>
      )}
    </form>
  );
};

export default Withdraw;
