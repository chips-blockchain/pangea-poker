import { Status } from "../../../lib/constants";

export type IBalance = number | string;

export interface IProps {
  closeCashierModal: () => () => void;
  onSubmitForm: () => () => void;
  amount: string;
  address: string;
}
export interface ISuccessWithdrawProps {
  latestTransactionId: string;
  amount: string;
  address: string;
  withdrawStatus: Status;
}
export interface IWithdrawalConfirmationProps {
  amount: string;
  address: string;
  back: () => () => void;
  goForward: () => () => void;
}

export interface IInfoRowProps {
  label: string;
  children: any;
}

export interface IWithdrawalInfoProps {
  balance: number;
  difference: number;
}
