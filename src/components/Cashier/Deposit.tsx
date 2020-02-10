import React, { useState } from "react";
import styled from "@emotion/styled";
import ReactTooltip from "react-tooltip";
import { IState } from "../../store/initialState";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
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
  cursor: pointer;
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

  const handleSubmit = () => (): void => {
    updateStateValue("isCashierOpen", false, dispatch);
  };

  const copyToClipBoard = () => (): void => {
    navigator.clipboard.writeText(depositAddress);
    setIsAddressCopied(true);
    ReactTooltip.hide();
  };

  return (
    <section>
      <Balance>Available CHIPS: {balanceWithDecimals(balance)}</Balance>
      <AddressLabel>Your CHIPS deposit address:</AddressLabel>
      <DepositAddressContainer
        data-tip={isAddressCopied ? "Copied!" : "Copy to Clipboard"}
        onClick={copyToClipBoard()}
      >
        <DepositAddress>{depositAddress}</DepositAddress>
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
      <ReactTooltip className="react-tooltip" />
    </section>
  );
};

export default Deposit;
