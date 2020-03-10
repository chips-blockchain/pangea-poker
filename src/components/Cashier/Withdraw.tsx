import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { IState } from "../../store/initialState";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
import isValidAddress from "../../lib/isValidAddress";
import ModalButtonsWrapper from "../Modal/ModalButtonsWrapper";
import { Button } from "../Controls";
import { Dropdown } from "../Form";
import InputWithButton from "../Form/InputWIthButton";

import "../../styles/tooltip.css";

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
  closeCashierModal: Function;
}

const Balance = styled.div`
  color: var(--color-accent);
`;

const InputWrapper = styled.div`
  margin-top: 1rem;
`;

const Withdraw: React.FunctionComponent<IProps> = ({
  state,
  closeCashierModal
}) => {
  const { balance, withdrawAddressList } = state;

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

  const [amountToWIthdraw, setAmountToWIthdraw] = useState("");

  const handleAmountInput = () => (e): void => {
    setAmountToWIthdraw(e.target.value);
  };

  const setMaxAmount = () => () => setAmountToWIthdraw(state.balance);

  return (
    <form>
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
        />
        <Dropdown
          name="withdraw-address-list"
          label="CHIPS address to withdraw to:"
          options={validatedWithdrawAdressList}
        />
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
        />
      </ModalButtonsWrapper>
    </form>
  );
};

export default Withdraw;
