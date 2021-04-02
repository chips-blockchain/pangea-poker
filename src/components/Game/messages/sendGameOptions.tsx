import { sendMessage } from "../../../store/actions";

export default function sendGameOptions(option, method, state, dispatch): void {
  sendMessage(
    {
      method: method,
      value: option[method]
    },
    state,
    dispatch
  );
}
