import { IMessage, onMessage_player } from "../onMessage";
import state from "../../../store/initialState";
import * as actions from "../../../store/actions";

const dispatch = jest.fn();

const receiveMessage = (message: IMessage) => {
  const {
    action,
    showInfo,
    method,
    playerid,
    bet_amount,
    winners,
    win_amount
  } = message;

  onMessage_player(
    JSON.stringify({
      action,
      bet_amount,
      method,
      playerid,
      showInfo,
      win_amount,
      winners
    }),
    `player${playerid + 1}`,
    state,
    dispatch
  );
};

describe("handHistory", () => {
  const addToHandHistorySpy = jest.spyOn(actions, "addToHandHistory");

  test("logs posting the blinds from the Small Blind's perspective", () => {
    receiveMessage({
      action: "small_blind_bet",
      method: "betting",
      playerid: 0
    });

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(2);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player1 posts the Small Blind of ${state.blinds[0]}.`,
      dispatch
    );
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player2 posts the Big Blind of ${state.blinds[1]}.`,
      dispatch
    );
  });

  test("logs posting the blinds from the Big Blind's perspective", () => {
    receiveMessage({ action: "big_blind_bet", method: "betting", playerid: 1 });

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(2);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player2 posts the Big Blind of ${state.blinds[1]}.`,
      dispatch
    );
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player1 posts the Small Blind of ${state.blinds[0]}.`,
      dispatch
    );
  });

  test("logs check", () => {
    receiveMessage({ action: "check", method: "betting", playerid: 0 });

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player1 checks.`,
      dispatch
    );
  });

  test("logs call", () => {
    receiveMessage({ action: "call", method: "betting", playerid: 1 });

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player2 calls.`,
      dispatch
    );
  });

  test("logs raise", () => {
    receiveMessage({
      action: "raise",
      method: "betting",
      playerid: 1,
      bet_amount: 100
    });

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player2 raises to 100.`,
      dispatch
    );
  });

  test("logs fold", () => {
    receiveMessage({ action: "fold", method: "betting", playerid: 0 });

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player1 folds.`,
      dispatch
    );
  });

  test("logs all-in", () => {
    receiveMessage({
      action: "allin",
      method: "betting",
      playerid: 1,
      bet_amount: 1000
    });

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player2 is All-In with 1000.`,
      dispatch
    );
  });

  test("logs the dealer info for new hands", () => {
    receiveMessage({ method: "dealer", playerid: 1 });

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(2);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `A new hand is being dealt.`,
      dispatch
    );
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `The dealer is Player2.`,
      dispatch
    );
  });

  test("logs the winner and the win amount", () => {
    receiveMessage({
      method: "finalInfo",
      showInfo: { boardCardInfo: ["10c", "Ad", "Ac", null, null] },
      win_amount: 1000,
      winners: [0]
    });

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player1 wins 1000.`,
      dispatch
    );
  });
});
