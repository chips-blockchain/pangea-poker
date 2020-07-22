import { IState } from "../../../store/initialState";
import { bet, setLastAction, addToHandHistory } from "../../../store/actions";
import log from "../../../lib/dev";
import palyerStringToId from "../../../lib/playerStringToId";

/**
 *
 * @param type   "Small"
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
  console.log("is Current Player", playerid);
  return playerid === palyerStringToId(state.userSeat);
};
