import React from "react";
import { ISuccessWithdrawProps } from "./types";
import { Status } from "../../lib/constants";
import "./assets/withdrawalResult.css";
import CopyToClipboard from "../_General/CopyToClipboard";
import data from "../../data";
import c from "./assets/constants";
import substr from "../../lib/substr";
import styled from "@emotion/styled"

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
        <div className="infoRow">
          <label>{c.AMOUNT}</label>
          <div>{amount.concat(" ", c.CHIPS)}</div>
        </div>
        <div className="infoRow">
          <label>{c.ADDR}</label>
          <div>{address}</div>
        </div>
        <div className="infoRow">
          <label>{c.TX_INFO}</label>
          <div>
            <a href={txUrl} target="_blank" rel="noreferrer">
              {c.TX_CONFIRMATION}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalResult;
