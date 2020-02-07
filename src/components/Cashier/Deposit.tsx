import React from "react";
import { IState } from "../../store/initialState";

interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
}

const Deposit: React.FunctionComponent<Iprops> = () => {
  return (
    <section>
      <div>Available CHIPS: 0.00754322</div>
      <div>Your CHIPS deposit address:</div>
      <div>RMZHMdSAJrGzsKp7xUtLtYizBf9L8eVawZ</div>
      <p>
        Please only deposit CHIPS to this address. Transactions might take up to
        4 hours to confirm.
      </p>
    </section>
  );
};

export default Deposit;
