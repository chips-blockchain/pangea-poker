import { Status } from "../../../lib/constants";
import { IState } from "../../../store/types";

export type IBalance = number | string;

export interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
  closeCashierModal: () => () => void;
}
export interface ISuccessWithdrawProps {
  latestTransactionId: string;
  amount: string;
  address: string;
  withdrawStatus: Status;
}
