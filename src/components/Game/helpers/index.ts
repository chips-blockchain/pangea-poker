import { IState } from "../../../store/types";
import { bet, setLastAction, addToHandHistory } from "../../../store/actions";
import log from "../../../lib/dev";
import playerStringToId from "../../../lib/playerStringToId";

/**
 *
 * @param type      "Small|Big"
 * @param playerId
 * @param amount
 * @param state
 * @param dispatch
 */
export const blindBet = (
  type: string,
  playerId: number,
  amount: number,
  state: IState,
  dispatch: (arg: object) => void
): void => {
  bet(playerId, amount, state, dispatch);
  setLastAction(playerId, `${type} Blind`, dispatch);
  log(`${type} Blind` + " has been posted.", "info");
  addToHandHistory(
    `Player${playerId + 1} posts the ${type} Blind of ${amount}.`,
    dispatch
  );
};

export const isCurrentPlayer = (playerid: number, state: IState): boolean => {
  return playerid === playerStringToId(state.userSeat);
};
