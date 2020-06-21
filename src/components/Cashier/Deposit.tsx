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
import {AdditionalInfo, AddressLabel, Balance, DepositAddress, DepositAddressContainer } from './css/style';

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
  closeCashierModal: () => () => void;
}

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
      <AddressLabel>Your CHIPS deposit address:</AddressLabel>
      <DepositAddressContainer
        data-tip={isAddressCopied ? "Copied!" : "Copy to Clipboard"}
        onClick={isDepositAddressValid ? copyToClipBoard() : undefined}
        data-test="address-container-cashier-deposit"
      >
        <DepositAddress css={cursorStyle} data-test="address-cashier-deposit">
          {isDepositAddressValid ? depositAddress : "Invalid address"}
        </DepositAddress>
      </DepositAddressContainer>
      <AdditionalInfo>
        Please only deposit CHIPS to this address. Transactions might take up to
        4 hours to confirm.
      </AdditionalInfo>
      <ModalButtonsWrapper>
        <Button
          label="Close"
          onClick={closeCashierModal()}
          data-test="close-cashier-deposit"
        />
      </ModalButtonsWrapper>
      {isDepositAddressValid && <ReactTooltip className="react-tooltip" />}
    </section>
  );
};

export default Deposit;
