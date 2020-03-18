import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
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

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
  closeCashierModal: () => () => void;
}

const Balance = styled.div`
  color: var(--color-accent);
`;

const ErrorMessage = styled.div`
  color: var(--color-accent);
  font-size: var(--font-size-xs);
`;

const InputWrapper = styled.div`
  margin-top: 1rem;
`;

const Withdraw: React.FunctionComponent<IProps> = ({
  state,
  closeCashierModal
}) => {
  const { balance, withdrawAddressList } = state;

  // Form handling
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    // TODO: Add withdraw message
    console.log("Withdraw Executed YAY");
  };

  const [amountToWIthdraw, setAmountToWIthdraw] = useState("0.00000000");

  // Handle Amount Input
  const handleAmountInput = () => (e): void => {
    const amount = e.target.value;
    // Limit input to 8 decimal points maximum
    const reg = /^[0-9]|[0-9]+(\.[0-9]{1,8})$/g;
    if (reg.test(amount) || amount === "") {
      setAmountToWIthdraw(amount);
    }
  };

  // Convert the amount to 8 decimals when the focus changes
  const handleOnBlur = () => (): void => {
    setAmountToWIthdraw(displayBalanceDecimals(amountToWIthdraw));
  };

  // Validate withdraw addresses before displaying them on the UI
  const [
    validatedWithdrawAddressList,
    setValidatedWithdrawAddressList
  ] = useState([]);

  useEffect(() => {
    const validAddressList = withdrawAddressList.map(address => {
      if (isValidAddress(address)) return address;
    });

    setValidatedWithdrawAddressList(validAddressList);
  }, [state.withdrawAddressList]);

  const setMaxAmount = () => (): void => setAmountToWIthdraw(state.balance);

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test="withdraw-tab">
      <Balance data-test="withdraw-balance">
        Available CHIPS: {balanceWithDecimals(Number(balance))}
      </Balance>
      <InputWrapper>
        <InputWithButton
          data-test="withdraw-amount"
          buttonLabel="Max"
          forwardRef={register({ required: true })}
          handleButtonClick={setMaxAmount()}
          label="Amount to withdraw"
          name="withdraw-amount"
          onChange={handleAmountInput()}
          onBlur={handleOnBlur()}
          type="number"
          value={amountToWIthdraw}
          // TODO: Add regex to validate - /[0-9]+(\.[0-9]{1,8})/g
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
        />
        <ErrorMessage>
          {errors["withdraw-address-list"] &&
            "Please select a withdraw address"}
        </ErrorMessage>
      </InputWrapper>
      <ModalButtonsWrapper>
        <Button
          label="Close"
          onClick={closeCashierModal()}
          data-test="close-button-cashier-withdraw"
        />
        <Button
          label="Withdraw"
          onClick={closeCashierModal()}
          data-test="withdraw-button"
          isHighlighted
          isSubmit
        />
      </ModalButtonsWrapper>
    </form>
  );
};

export default Withdraw;
