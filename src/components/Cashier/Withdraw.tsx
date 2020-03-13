import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { IState } from "../../store/initialState";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
import isValidAddress from "../../lib/isValidAddress";
import ModalButtonsWrapper from "../Modal/ModalButtonsWrapper";
import { Button } from "../Controls";
import { Dropdown } from "../Form";
import InputWithButton from "../Form/InputWIthButton";
import { useForm } from "react-hook-form";

import "../../styles/tooltip.css";

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
  closeCashierModal: Function;
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
  const onSubmit = data => {
    console.log("Withdraw TBD");
  };

  const [amountToWIthdraw, setAmountToWIthdraw] = useState(0);

  const handleAmountInput = () => (e): void => {
    setAmountToWIthdraw(e.target.value);
  };

  // Validate withdraw addresses before displaying them on the UI
  const [
    validatedWithdrawAdressList,
    setValidatedWithdrawAdressList
  ] = useState([]);

  useEffect(() => {
    const validAddressList = withdrawAddressList.map(address => {
      if (isValidAddress(address)) return address;
    });

    setValidatedWithdrawAdressList(validAddressList);
  }, [state.withdrawAddressList]);

  const setMaxAmount = () => (): void => setAmountToWIthdraw(state.balance);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Balance data-test="balance-cashier-deposit">
        Available CHIPS: {balanceWithDecimals(Number(balance))}
      </Balance>
      <InputWrapper>
        <InputWithButton
          label="Amount to withdraw"
          name="withdraw-amount"
          type="number"
          onChange={handleAmountInput()}
          value={amountToWIthdraw}
          handleButtonClick={setMaxAmount()}
          forwardRef={register({ required: true })}
          // Regex progress to validate: /[0-9]+(\.[0-9]{1,8})/g
        />
        <ErrorMessage>
          {errors["withdraw-amount"] && "Please set a withdaw amount"}
        </ErrorMessage>
        <Dropdown
          name="withdraw-address-list"
          label="CHIPS address to withdraw to:"
          options={validatedWithdrawAdressList}
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
          // onClick={closeCashierModal()}
          data-test="withdraw-button"
          isHighlighted
          isSubmit
        />
      </ModalButtonsWrapper>
    </form>
  );
};

export default Withdraw;
