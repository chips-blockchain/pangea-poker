import sendGameOptions from "../../components/Game/messages/sendGameOptions";
import { gameOptions } from "../../lib/constants";
import { IState } from "../types";

const chooseGameOption = (
  option: object,
  dispatch: (arg: object) => void,
  state: IState
): void => {
  const idx = Object.values(gameOptions).findIndex(
    val => val === Object.keys(option)[0]
  );
  const method = Object.keys(gameOptions)[idx];
  dispatch({
    type: "chooseGameOption",
    payload: { [method]: option }
  });
  sendGameOptions(option, method, state, dispatch);
};

export default chooseGameOption;
