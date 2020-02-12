import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import ReactTooltip from "react-tooltip";
import { IState } from "../../store/initialState";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
import isValidAddress from "../../lib/isValidAddress";
import ModalButtonsWrapper from "../Modal/ModalButtonsWrapper";
import { Button } from "../Controls";
import { updateStateValue } from "../../store/actions";
import "../../styles/tooltip.css";

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
}

const AdditionalInfo = styled.p`
  font-family: "PT Sans";
  font-weight: 400;
  font-size: 0.875rem;
  margin-top: 1.5rem;
`;

const AddressLabel = styled.h2`
  font-family: "PT Sans";
  font-weight: 400;
  font-size: 0.875rem;
  margin-top: 2rem;
`;

const Balance = styled.div`
  color: var(--accent);
`;

const DepositAddress = styled.span`
  color: var(--primaryLight);
  font-size: 0.875rem;
`;

const DepositAddressContainer = styled.div`
  background-color: var(--darkGrey);
  border: 1px solid var(--primary);
  border-radius: 4px;
  padding: 0.5rem;
`;

const Deposit: React.FunctionComponent<IProps> = ({ state, dispatch }) => {
  const { balance, depositAddress } = state;

  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [isDepositAddressValid, setIsDepositAddressValid] = useState(false);

  // Validate if the deposit address is correct
  useEffect(() => {
    setIsDepositAddressValid(isValidAddress(depositAddress));
  }, [balance]);

  // Close the Cashier modal
  const handleSubmit = () => (): void => {
    updateStateValue("isCashierOpen", false, dispatch);
  };

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
        onClick={isDepositAddressValid && copyToClipBoard()}
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
          onClick={handleSubmit()}
          data-test="close-cashier-deposit"
        />
      </ModalButtonsWrapper>
      {isDepositAddressValid && <ReactTooltip className="react-tooltip" />}
    </section>
  );
};

export default Deposit;
