import { IMessage } from "../types/IMessage";
import { IState } from "../../../store/types";

interface IMethodFunction {
  message: IMessage,
  state: IState,
  dispatch: (arg: object) => void
}

export default IMethodFunction