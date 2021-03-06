import React, { useState, useEffect } from "react";
import { IState } from "../../store/types";
import balanceWithDecimals from "../../lib/balanceWithDecimals";
import isValidAddress from "../../lib/isValidAddress";
import { Button } from "../Controls";
import substr from "../../lib/substr";

import c from "./assets/constants";
import CopyToClipboard from "../_General/CopyToClipboard";

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
      <div id="cashierBalance" data-test="balance-cashier-deposit">
        Available: {balanceWithDecimals(balance) + " " + c.CHIPS}
      </div>
      <h2 id="depositAddrLabel">{c.ADDRESS_LABEL}</h2>
      <div id="cashierInput" data-test="address-container-cashier-deposit">
        <p data-test="address-cashier-deposit">
          {isDepositAddressValid ? substr(depositAddress) : "Invalid address"}
        </p>
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
