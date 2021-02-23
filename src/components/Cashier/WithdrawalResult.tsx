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
`;

const WithdrawalResult: React.FunctionComponent<ISuccessWithdrawProps> = ({
  latestTransactionId,
  amount,
  address,
  withdrawStatus
}) => {
  const txUrl = data.explorerLink.concat(latestTransactionId);

  return (
    <div>
      <SuccessMessage status={withdrawStatus}>
        {Status[withdrawStatus]}
        {withdrawStatus === Status.Processing && (
          <div id="transactionIdText">{c.PROCESSING}</div>
        )}
      </SuccessMessage>
      {withdrawStatus === Status.Success && (
        <div id="transactionId">
          <div id="transactionIdText">{c.TX_LABEL}</div>
          <div id="cashierInput">
            <p>{substr(latestTransactionId)}</p>
            <CopyToClipboard textToCopy={latestTransactionId} />
          </div>
        </div>
      )}
      <div id="withdrawalInfo">
        <InfoRow label={c.AMOUNT}>
         {amount.concat(" ", c.CHIPS)}
        </InfoRow>
        <InfoRow label={c.ADDR}>
          {address}
        </InfoRow>
        {latestTransactionId && (
          <InfoRow label={c.TX_INFO}>
            <a href={txUrl} target="_blank" rel="noreferrer">
              {c.TX_CONFIRMATION}
            </a>
          </InfoRow>
        )}
      </div>
    </div>
  );
};

export default WithdrawalResult;
