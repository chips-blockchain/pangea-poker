/*eslint-disable @typescript-eslint/camelcase*/

import { IMessage, onMessage_player } from "../onMessage";
import state, { IState } from "../../../store/initialState";
import * as actions from "../../../store/actions";

const dispatch = jest.fn();
const updateStateValueSpy = jest.spyOn(actions, "updateStateValue");

export const receiveMessage = (
  message: IMessage,
  userSeat: number,
  stateToTest: IState = state
): void => {
  const {
    action,
    addr,
    balance,
    bet_amount,
    deal,
    method,
    playerid,
    possibilities,
    showInfo,
    win_amount,
    winners
  } = message;

  onMessage_player(
    JSON.stringify({
      action,
      addr,
      balance,
      deal,
      bet_amount,
      method,
      playerid,
      possibilities,
      showInfo,
      win_amount,
      winners
    }),
    `player${userSeat + 1}`,
    stateToTest,
    dispatch
  );
};

// Active Player Handling
describe("Active player handling", () => {
  const setActivePlayerSpy = jest.spyOn(actions, "setActivePlayer");
  const showControlsSpy = jest.spyOn(actions, "showControls");

  test("reveal the controls for the player at userSeat", () => {
    receiveMessage(
      {
        action: "round_betting",
        method: "betting",
        playerid: 1,
        possibilities: [4, 5, 6]
      },
      1
    );

    expect(showControlsSpy).toHaveBeenCalledTimes(1);
    expect(showControlsSpy).toHaveBeenCalledWith(true, dispatch);
  });

  test("does not reveal the controls when it's the opponent's turn", () => {
    receiveMessage(
      {
        action: "round_betting",
        method: "betting",
        playerid: 0,
        possibilities: [4, 5, 6]
      },
      1
    );

    expect(showControlsSpy).toHaveBeenCalledTimes(0);
  });

  test("highlights the correct active player", () => {
    receiveMessage(
      {
        action: "round_betting",
        method: "betting",
        playerid: 0,
        possibilities: [4, 5, 6]
      },
      1
    );

    expect(setActivePlayerSpy).toHaveBeenCalledTimes(1);
    expect(setActivePlayerSpy).toHaveBeenCalledWith("player1", dispatch);
  });
});

// Hand History
describe("handHistory", () => {
  const addToHandHistorySpy = jest.spyOn(actions, "addToHandHistory");

  test("logs posting the blinds from the Small Blind's perspective", () => {
    receiveMessage(
      {
        action: "small_blind_bet",
        method: "betting",
        playerid: 0
      },
      0
    );

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
    receiveMessage(
      { action: "big_blind_bet", method: "betting", playerid: 1 },
      1
    );

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
    receiveMessage({ action: "check", method: "betting", playerid: 0 }, 0);

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player1 checks.`,
      dispatch
    );
  });

  test("logs call", () => {
    receiveMessage({ action: "call", method: "betting", playerid: 1 }, 1);

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player2 calls.`,
      dispatch
    );
  });

  test("logs raise", () => {
    receiveMessage(
      {
        action: "raise",
        method: "betting",
        playerid: 1,
        bet_amount: 100
      },
      1
    );

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player2 raises to 100.`,
      dispatch
    );
  });

  test("logs bet", () => {
    const stateToTest = {
      ...state,
      toCall: 0
    };
    receiveMessage(
      {
        action: "raise",
        method: "betting",
        playerid: 1,
        bet_amount: 100
      },
      1,
      stateToTest
    );

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player2 bets 100.`,
      dispatch
    );
  });

  test("logs fold", () => {
    receiveMessage({ action: "fold", method: "betting", playerid: 0 }, 0);

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player1 folds.`,
      dispatch
    );
  });

  test("logs all-in", () => {
    receiveMessage(
      {
        action: "allin",
        method: "betting",
        playerid: 1,
        bet_amount: 1000
      },
      1
    );

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player2 is All-In with 1,000.`,
      dispatch
    );
  });

  test("logs the dealer info for new hands", () => {
    receiveMessage({ method: "dealer", playerid: 1 }, 1);

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
    receiveMessage(
      {
        method: "finalInfo",
        showInfo: { boardCardInfo: ["10c", "Ad", "Ac", null, null] },
        win_amount: 1000,
        winners: [0]
      },
      0
    );

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `Player1 wins 1,000.`,
      dispatch
    );
  });

  test("logs the winner and the win amount in case of split pot and two winners", () => {
    receiveMessage(
      {
        method: "finalInfo",
        showInfo: { boardCardInfo: ["10c", "Ad", "Ac", null, null] },
        win_amount: 1000,
        winners: [0, 1]
      },
      0
    );

    expect(addToHandHistorySpy).toHaveBeenCalledTimes(1);
    expect(addToHandHistorySpy).toHaveBeenCalledWith(
      `The pot is split between player1 and player2. Each player wins 1,000.`,
      dispatch
    );
  });
});

// Wallet Info
describe("walletInfo", () => {
  test("updates the balance and the deposit address", () => {
    const address = "123456789a123456789a123456789a1234";
    const balance = 9.9873;
    receiveMessage(
      {
        method: "walletInfo",
        addr: address,
        balance
      },
      0
    );

    expect(updateStateValueSpy).toHaveBeenCalled();
    expect(updateStateValueSpy).toHaveBeenCalledTimes(2);
    expect(updateStateValueSpy).toHaveBeenCalledWith(
      "depositAddress",
      address,
      dispatch
    );
    expect(updateStateValueSpy).toHaveBeenCalledWith(
      "balance",
      balance,
      dispatch
    );
  });
});
