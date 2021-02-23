import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import isValidAddress from "../../lib/isValidAddress";
import displayBalanceDecimals from "../../lib/balanceWithDecimals";
import { getTotal, inputIsValid } from "./helpers";

import { Button } from "../Controls";
import { Input } from "../Form";
import InputWithButton from "../Form/InputWIthButton";
import WithdrawalInfo from "./WithdrawalInfo";

import { IProps } from "./types";
import { StateContext } from "../../store/context";

import { css } from "@emotion/core";
import { customInputStyle, customLabelStyle } from "../Form/assets/style";
import "./assets/style.css";


const WithdrawalForm: React.FunctionComponent<IProps> = ({
  onSubmitForm,
  closeCashierModal,
  amount,
  address
}) => {
  const { balance, transactionFee } = useContext(StateContext);
  const [amountToWithdraw, setAmountToWithdraw] = useState(amount);
  const [difference, setDifference] = useState(0);
  const [addressError, setAddressError] = useState(" ");
  const [withdrawAddress, setWithdrawAddress] = useState(address);
  const [validAddress, setValidAddress] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  /****** AMOUNT HANDLERS ******/

  const setWithdrawAmount = (amount: string | number): void => {
    const amnt = displayBalanceDecimals(amount);
    setAmountToWithdraw(amnt);
  };

  const setDifferenceAmount = (amount: string | number): void =>
    setDifference(
      Number(displayBalanceDecimals(getTotal(amount, transactionFee)))
    );

  const setAmount = (amount: string | number): void => {
    setWithdrawAmount(amount);
    setDifferenceAmount(amount);
  };

  const setMaxAmount = () => (): void => setAmount(balance);

  /****** FORM HANDLERS ******/

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
    setAmount(e.target.value);
  };

  // Handle address input
  const handleAddressInput = () => (e): void => {
    setAddressError(" ");
    setWithdrawAddress(e.target.value);
  };

  const onAddressBlur = () => (e): void => {
    if (!isValidAddress(e.target.value)) {
      setAddressError("The specified address is invalid.");
      setValidAddress(false);
    } else {
      setValidAddress(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} data-test="withdraw-tab">
      <React.Fragment>
        <p id="cashierBalance" data-test="withdraw-balance">
          {"Available:".concat(
            " ",
            String(displayBalanceDecimals(balance)),
            " ",
            "CHIPS"
          )}
        </p>
        <div
          css={css`
            margin-top: 1rem;
          `}
        >
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
            placeholder={amount}
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
            placeholder={address}
            required={true}
            type="string"
            value={withdrawAddress}
          />
          <div id="withdrawError">
            {addressError}
            {errors["withdraw-amount"] && "Please set a withdaw amount"}
          </div>
          <WithdrawalInfo
            balance={displayBalanceDecimals(transactionFee)}
            difference={difference}
          />
        </div>
        <div className="cashierButtons">
          <Button
            label="Close"
            onClick={closeCashierModal()}
            data-test="close-button-cashier-withdraw"
          />
          <Button
            css={css`
              display: none;
            `}
            label="Withdraw"
            data-test="withdraw-button"
            isHighlighted
            isSubmit
            disabled={!amountToWithdraw || !withdrawAddress || !validAddress}
          />
        </div>
      </React.Fragment>
    </form>
  );
};

export default WithdrawalForm;
