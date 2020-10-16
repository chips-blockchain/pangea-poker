import React, { useState, useEffect, forwardRef } from "react";
import { css } from "@emotion/core";
import { useForm } from "react-hook-form";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
import isValidAddress from "../../lib/isValidAddress";
import { ModalButtonsWrapper } from "../Modal/assets/style";
import { Button } from "../Controls";
import { Dropdown, Input } from "../Form";
import InputWithButton from "../Form/InputWIthButton";
import "../../styles/tooltip.css";
import "./assets/style.css";
import displayBalanceDecimals from "../../lib/balanceWithDecimals";

import {
  Balance,
  ErrorMessage,
  InputWrapper,
  SuccessMessage
} from "./assets/style";
import { inputIsValid } from "./helpers";
import { IBalance, IProps } from "./types";
import { customInputStyle, customLabelStyle } from "../Form/assets/style";

const Withdraw: React.FunctionComponent<IProps> = ({
  state,
  closeCashierModal
}) => {
  const { balance, withdrawAddressList } = state;
  const balanceNumber = Number(balance);

  enum Status {
    Initial,
    Processing,
    Success,
    Error
  }

  const [amountToWithdraw, setAmountToWithdraw] = useState<IBalance>(0);
  const [difference, setDifference] = useState(0);
  const [addressError, setAddressError] = useState(" ");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawStatus, setWithdrawStatus] = useState(Status.Initial);

  // Form handling
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (): void => {
    // TODO: Add withdraw message to dcv
    setWithdrawStatus(Status.Success);
  };

  // Handle Amount Input
  const handleAmountInput = () => (e): void => {
    const amount: string = e.target.value;
    if (inputIsValid(amount)) {
      setAmountToWithdraw(Number(amount));
    }
    const diff: number = Number(amount) - Number(state.transactionFee);
    setDifference(Number(displayBalanceDecimals(diff)));
  };

  // Handle focusing out from the input component
  const handleOnBlur = () => (e): void => {
    // Convert the amount to 8 decimals when the focus changes
    setAmountToWithdraw(displayBalanceDecimals(amountToWithdraw));

    // Reset the input field to the max amount (i.e. the balance) when focus changes
    if (e.target.value > balanceNumber) {
      setAmountToWithdraw(balanceNumber);
      setDifference(0);
    }
  };

  // Handle address input
  const handleAddressInput = () => (e): void => {
    if (addressError) {
      setAddressError(" ");
    }
    setWithdrawAddress(e.target.value);
  };

  const onAddressBlur = () => (e): void => {
    if (!isValidAddress(e.target.value)) {
      setAddressError("The specified address is invalid.");
    }
  };

  const setMaxAmount = () => (): void => setAmountToWithdraw(balanceNumber);

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test="withdraw-tab">
      {withdrawStatus === Status.Success ? (
        <SuccessMessage>
          <div>🤑</div>
          {amountToWithdraw} has been succesfully withdrawn to {withdrawAddress}
        </SuccessMessage>
      ) : (
        <React.Fragment>
          <Balance data-test="withdraw-balance">
            Available: {balanceWithDecimals(balanceNumber)} CHIPS
          </Balance>
          <InputWrapper>
            <InputWithButton
              data-test="withdraw-amount"
              buttonLabel="Max"
              forwardRef={register({ required: true })}
              handleButtonClick={setMaxAmount()}
              label="Enter amount"
              min={0}
              max={balanceNumber}
              name="withdraw-amount"
              onChange={handleAmountInput()}
              onBlur={handleOnBlur()}
              step={0.00000001}
              type="number"
              value={amountToWithdraw}
            />
            <Input
              customStyle={customInputStyle}
              customLabelStyle={customLabelStyle}
              data-test="address-input"
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
                <div>{displayBalanceDecimals(state.transactionFee)} CHIPS</div>
              </div>
              <div className="infoLine">
                <h5>Total</h5>
                <div>{difference} CHIPS</div>
              </div>
            </div>
          </InputWrapper>
        </React.Fragment>
      )}
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
    </form>
  );
};

export default Withdraw;
