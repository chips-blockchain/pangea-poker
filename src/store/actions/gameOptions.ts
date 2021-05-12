import { IState } from "../types";
import { gameOptions } from "../../lib/constants";
import sendGameOptions from "../../components/Game/messages/sendGameOptions";

const chooseGameOption = (
  option: object,
  dispatch: (arg: object) => void,
  state: IState
): void => {
  const idx = Object.values(gameOptions).findIndex(
    val => val === Object.keys(option)[0]
  );
  const method = Object.keys(gameOptions)[idx];
  const value = Object.values(option)[0];
  dispatch({
    type: "chooseGameOption",
    payload: { [method]: Number(value) }
  });
  sendGameOptions(Number(value), method, state, dispatch);
};

export default chooseGameOption;
