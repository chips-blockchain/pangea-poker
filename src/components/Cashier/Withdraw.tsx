import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { useForm } from "react-hook-form";
import { IState } from "../../store/initialState";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
import isValidAddress from "../../lib/isValidAddress";
import ModalButtonsWrapper from "../Modal/ModalButtonsWrapper";
import { Button } from "../Controls";
import { Dropdown } from "../Form";
import InputWithButton from "../Form/InputWIthButton";

import "../../styles/tooltip.css";
import displayBalanceDecimals from "../../lib/balanceWithDecimals";

import { Balance, ErrorMessage, InputWrapper, SuccessMessage } from "./css/style";

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
  closeCashierModal: () => () => void;
}

type IBalance = number | string;

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
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [
    validatedWithdrawAddressList,
    setValidatedWithdrawAddressList
  ] = useState([]);
  const [withdrawStatus, setWithdrawStatus] = useState(Status.Initial);

  // Form handling
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (): void => {
    // TODO: Add withdraw message to dcv
    setWithdrawStatus(Status.Success);
  };

  // Handle Amount Input
  const handleAmountInput = () => (e): void => {
    const amount = e.target.value;
    // Limit input to 8 decimal points maximum
    const reg = /^[0-9]|[0-9]+(\.[0-9]{1,8})$/g;
    if (reg.test(amount) || amount === "") {
      setAmountToWithdraw(amount);
    }
  };

  // Handle focusing out from the input component
  const handleOnBlur = () => (e): void => {
    // Convert the amount to 8 decimals when the focus changes
    setAmountToWithdraw(displayBalanceDecimals(amountToWithdraw));
    // Reset the input field to the max amount (i.e. the balance) when focus changes
    if (e.target.value > balanceNumber) setAmountToWithdraw(balanceNumber);
  };

  // Handle select selection
  const handleSelect = () => (e): void => {
    setWithdrawAddress(e.target.value);
  };

  // Validate withdraw addresses before displaying them on the UI
  useEffect(() => {
    const validAddressList = withdrawAddressList.map(address => {
      if (isValidAddress(address)) return address;
    });

    setValidatedWithdrawAddressList(validAddressList);
  }, [state.withdrawAddressList]);

  // Set the first withdraw address in state to match the default select state
  useEffect(() => {
    setWithdrawAddress(validatedWithdrawAddressList[0]);
  }, [validatedWithdrawAddressList]);

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
            Available CHIPS: {balanceWithDecimals(balanceNumber)}
          </Balance>
          <InputWrapper>
            <InputWithButton
              data-test="withdraw-amount"
              buttonLabel="Max"
              forwardRef={register({ required: true })}
              handleButtonClick={setMaxAmount()}
              label="Amount to withdraw"
              min={0}
              max={balanceNumber}
              name="withdraw-amount"
              onChange={handleAmountInput()}
              onBlur={handleOnBlur()}
              step={0.00000001}
              type="number"
              value={amountToWithdraw}
            />
            <ErrorMessage>
              {errors["withdraw-amount"] && "Please set a withdaw amount"}
            </ErrorMessage>
            <Dropdown
              data-test="withdraw-address-list"
              name="withdraw-address-list"
              label="CHIPS address to withdraw to:"
              options={validatedWithdrawAddressList}
              forwardRef={register({ required: true })}
              onChange={handleSelect()}
            />
            <ErrorMessage>
              {errors["withdraw-address-list"] &&
                "Please select a withdraw address"}
            </ErrorMessage>
          </InputWrapper>
        </React.Fragment>
      )}
      <ModalButtonsWrapper>
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
      </ModalButtonsWrapper>
    </form>
  );
};

export default Withdraw;
