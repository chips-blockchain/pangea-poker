import React from "react";
import { ISuccessWithdrawProps } from "./types";
import { Status } from "../../lib/constants";
import "./assets/withdrawalResult.css";
import CopyToClipboard from "../_General/CopyToClipboard";
import data from "../../data";
import c from "./assets/constants";
import substr from "../../lib/substr";
import styled from "@emotion/styled";
import InfoRow from "./InfoRow";
import { Button } from "../Controls";

export const SuccessMessage = styled.div`
  color: ${p =>
    p.status == Status.Success
      ? "var(--color-accent)"
      : p.status == Status.Processing
      ? "var(--color-lightGray)"
      : "var(--color-danger)"};
  font-size: var(--font-size-m);

  & > p {
    font-size: var(--font-size-m);
  }
  grid-area: resultMessage;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 50px 90px 112px auto 20px;
  grid-template-areas:
    "resultMessage"
    "txId"
    "withdrawalInfo"
    "buttons"
    ".";
`;

const WithdrawalResult: React.FunctionComponent<ISuccessWithdrawProps> = ({
  latestTransactionId,
  amount,
  address,
  withdrawStatus,
  closeCashierModal
}) => {
  const txUrl = data.explorerLink.concat(latestTransactionId);

  return (
    <Container>
      <SuccessMessage status={withdrawStatus}>
        {Status[withdrawStatus]}
        {withdrawStatus === Status.Processing && (
          <div id="processingText">{c.PROCESSING}</div>
        )}
      </SuccessMessage>

      <div id="transactionId" style={{ gridArea: "txId" }}>
        <div id="transactionIdText">{c.TX_LABEL}</div>
        <div id="cashierInput">
          {withdrawStatus === Status.Success ? (
            <div>
              <p>{substr(latestTransactionId)}</p>
              <CopyToClipboard textToCopy={latestTransactionId} />
            </div>
          ) : (
            <p>----</p>
          )}
        </div>
      </div>
      <div id="withdrawalInfo" style={{ gridArea: "withdrawalInfo" }}>
        <InfoRow label={c.AMOUNT}>{amount.concat(" ", c.CHIPS)}</InfoRow>
        <InfoRow label={c.ADDR}>{address}</InfoRow>
        {latestTransactionId && (
          <InfoRow label={c.TX_INFO}>
            <a href={txUrl} target="_blank" rel="noreferrer">
              {c.TX_CONFIRMATION}
            </a>
          </InfoRow>
        )}
      </div>
      <div style={{ gridArea: "buttons" }}>
        <Button
          label="Close"
          onClick={closeCashierModal()}
          data-test="close-button-cashier-withdraw"
        />
      </div>
    </Container>
  );
};

export default WithdrawalResult;
