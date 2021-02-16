import React, { useState, useEffect } from "react";
import { IState } from "../../store/types";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
import isValidAddress from "../../lib/isValidAddress";
import { Button } from "../Controls";

import c from "./assets/constants";
import CopyToClipboard from "./CopyToClipboard";

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
  const [isDepositAddressValid, setIsDepositAddressValid] = useState(false);

  // Validate if the deposit address is correct
  useEffect(() => {
    setIsDepositAddressValid(isValidAddress(depositAddress));
  }, [balance]);

  return (
    <section>
      <div id="depositBalance" data-test="balance-cashier-deposit">
        Available: {balanceWithDecimals(balance) + " CHIPS"}
      </div>
      <h2 id="depositAddrLabel">{c.ADDRESS_LABEL}</h2>
      <div
        id="depositAddressContainer"
        data-test="address-container-cashier-deposit"
      >
        <div id="depositAddress" data-test="address-cashier-deposit">
          {isDepositAddressValid
            ? depositAddress.substr(0, 30) + "..."
            : "Invalid address"}
        </div>
        {isDepositAddressValid ? (
          <CopyToClipboard textToCopy={depositAddress} />
        ) : (
          ""
        )}
      </div>
      <p id="additionalInfo">{c.ADDITIONAL_INFO}</p>
      <div id="depositModalbuttons">
        <Button
          label="Close"
          onClick={closeCashierModal()}
          data-test="close-cashier-deposit"
        />
      </div>
    </section>
  );
};

export default Deposit;
