import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import ReactTooltip from "react-tooltip";
import { IState } from "../../store/initialState";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
import isValidAddress from "../../lib/isValidAddress";
import ModalButtonsWrapper from "../Modal/ModalButtonsWrapper";
import { Button } from "../Controls";
import "../../styles/tooltip.css";

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
  closeCashierModal: Function;
}

const AddressLabel = styled.h2`
  font-family: var(--font-family-secondary);
  font-weight: 400;
  font-size: var(--font-size-s);
  margin-top: 2rem;
`;

const Balance = styled.div`
  color: var(--color-accent);
`;

const DepositAddress = styled.span`
  color: var(--color-primaryLight);
  font-size: var(--font-size-s);
`;

const DepositAddressContainer = styled.div`
  background-color: var(--darkGrey);
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  padding: 0.5rem;
`;

const Deposit: React.FunctionComponent<IProps> = ({
  state,
  closeCashierModal
}) => {
  const { balance, depositAddress } = state;

  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [isDepositAddressValid, setIsDepositAddressValid] = useState(false);

  // Validate if the deposit address is correct
  useEffect(() => {
    setIsDepositAddressValid(isValidAddress(depositAddress));
  }, [balance]);

  // Copy the address to the clipboard and hide the tooltip when clicked
  const copyToClipBoard = () => (): void => {
    navigator.clipboard.writeText(depositAddress);
    setIsAddressCopied(true);
    ReactTooltip.hide();
  };

  // Set the cursor style based on whether the deposit address is valid
  const cursorStyle = css`
    cursor: ${isDepositAddressValid ? "pointer" : "not-allowed"};
  `;

  return (
    <section>
      <Balance data-test="balance-cashier-deposit">
        Available CHIPS: {balanceWithDecimals(balance)}
      </Balance>
      {/* Amount to Withdraw  */}
      <AddressLabel>CHIPS address to withdraw to:</AddressLabel>
      <DepositAddressContainer
        data-tip={isAddressCopied ? "Copied!" : "Copy to Clipboard"}
        onClick={isDepositAddressValid ? copyToClipBoard() : undefined}
        data-test="address-container-cashier-deposit"
      >
        <DepositAddress css={cursorStyle} data-test="address-cashier-deposit">
          {/* Withdrawal Address */}
        </DepositAddress>
      </DepositAddressContainer>
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
      {isDepositAddressValid && <ReactTooltip className="react-tooltip" />}
    </section>
  );
};

export default Deposit;
