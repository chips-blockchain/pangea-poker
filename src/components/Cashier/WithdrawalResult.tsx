import { ISuccessWithdrawProps } from "./types";
import { Status } from "../../lib/constants";
import "./assets/withdrawalResult.css";
import { SuccessMessage } from "./assets/style";

import CopyText from "./CopyText";

const WithdrawalResult: React.FunctionComponent<ISuccessWithdrawProps> = ({
  latestTransactionId,
  amount,
  address,
  withdrawStatus
}) => {
  const transactionLink =
    "https://explorer.chips.cash/tx/" + latestTransactionId;

  return (
    <div>
      <SuccessMessage status={withdrawStatus}>
        {Status[withdrawStatus]}
        {withdrawStatus === Status.Processing && (
          <div id="transactionIdText">Allow a few moments to process...</div>
        )}
      </SuccessMessage>
      {withdrawStatus === Status.Success && (
        <div>
          <div id="transactionIdText">Your transaction id</div>
          <CopyText textToCopy={latestTransactionId} />
        </div>
      )}
      <div id="withdrawalInfo">
        <div className="infoRow">
          <label>Amount</label>
          <div>{amount} CHIPS</div>
        </div>
        <div className="infoRow">
          <label>Addr</label>
          <div>{address}</div>
        </div>
        <div className="infoRow">
          <label>Tx info</label>
          <div>
            <a href={transactionLink} target="_blank" rel="noreferrer">
              CHIPS Explorer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalResult;
