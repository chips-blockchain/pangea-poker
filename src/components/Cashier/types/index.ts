import { IState } from "../../../store/types";

export type IBalance = number | string;

export interface IProps {
  dispatch: (arg: object) => void;
  state: IState;
  closeCashierModal: () => () => void;
}
