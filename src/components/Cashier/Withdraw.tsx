import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import ReactTooltip from "react-tooltip";
import { IState } from "../../store/initialState";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
import isValidAddress from "../../lib/isValidAddress";
import ModalButtonsWrapper from "../Modal/ModalButtonsWrapper";
import { Button } from "../Controls";
import { Dropdown } from "../Form";
import "../../styles/tooltip.css";

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
  closeCashierModal: Function;
}

const Balance = styled.div`
  color: var(--color-accent);
`;

const Deposit: React.FunctionComponent<IProps> = ({
  state,
  closeCashierModal
}) => {
  const { balance, withdrawAddressList } = state;

  const [
    validatedWithdrawAdressList,
    setValidatedWithdrawAdressList
  ] = useState([]);

  // Validate withdraw addresses before displaying them on the UI
  useEffect(() => {
    const validAddressList = withdrawAddressList.map(address => {
      if (isValidAddress(address)) return address;
    });

    setValidatedWithdrawAdressList(validAddressList);
  }, [state.withdrawAddressList]);

  return (
    <form>
      <Balance data-test="balance-cashier-deposit">
        Available CHIPS: {balanceWithDecimals(balance)}
      </Balance>
      {/* Amount to Withdraw  */}
      <Dropdown
        name="withdraw-address-list"
        label="CHIPS address to withdraw to:"
        options={validatedWithdrawAdressList}
      />
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

export default Deposit;
