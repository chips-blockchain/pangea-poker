import sounds from "../sounds";
import { receiveMessage } from "../../components/Game/__tests__/onMessage.test";
import state from "../../store/initialState";
import { GameTurns } from "../../lib/constants";

const {
  alert,
  call,
  collectChips,
  cardDrop,
  check,
  fold,
  raise,
  showFlop,
  winnerSelect
} = sounds;
jest.spyOn(alert, "play");
jest.spyOn(call, "play");
jest.spyOn(collectChips, "play");
jest.spyOn(cardDrop, "play");
jest.spyOn(check, "play");
jest.spyOn(fold, "play");
jest.spyOn(raise, "play");
jest.spyOn(showFlop, "play");
jest.spyOn(winnerSelect, "play");

describe("Sounds", () => {
  // Sounds from onMessage.ts
  test("Plays the alert sound when it's the player's turn", () => {
    receiveMessage(
      {
        action: "round_betting",
        possibilities: [0, 1, 2],
        method: "betting",
        playerid: 0
      },
      0
    );

    expect(alert.play).toHaveBeenCalled();
    expect(alert.play).toHaveBeenCalledTimes(1);
  });

  test("Plays the check sound when a player checks", () => {
    receiveMessage(
      {
        action: "check",
        method: "betting",
        playerid: 0
      },
      0
    );

    expect(check.play).toHaveBeenCalled();
    expect(check.play).toHaveBeenCalledTimes(1);
  });

  test("Plays the call sound when a player calls", () => {
    receiveMessage(
      {
        action: "call",
        method: "betting",
        playerid: 0
      },
      0
    );

    expect(call.play).toHaveBeenCalled();
    expect(call.play).toHaveBeenCalledTimes(1);
  });

  test("Plays the call sound when a player bets", () => {
    const stateToTest = { ...state, toCall: 0 };
    receiveMessage(
      {
        action: "raise",
        method: "betting",
        playerid: 0
      },
      0,
      stateToTest
    );

    expect(call.play).toHaveBeenCalled();
    expect(call.play).toHaveBeenCalledTimes(1);
  });

  test("Plays the call sound when a player bets", () => {
    const stateToTest = { ...state, toCall: 2 };
    receiveMessage(
      {
        action: "raise",
        method: "betting",
        playerid: 0
      },
      0,
      stateToTest
    );

    expect(raise.play).toHaveBeenCalled();
    expect(raise.play).toHaveBeenCalledTimes(1);
  });

  test("Plays the raise sound when a player goes all-in", () => {
    receiveMessage(
      {
        action: "allin",
        method: "betting",
        bet_amount: 1000, //eslint-disable-line @typescript-eslint/camelcase
        playerid: 0
      },
      0
    );

    expect(raise.play).toHaveBeenCalled();
    expect(raise.play).toHaveBeenCalledTimes(1);
  });

  test("Plays the fold sound when a player folds", () => {
    receiveMessage(
      {
        action: "fold",
        method: "betting",
        playerid: 0
      },
      0
    );

    expect(fold.play).toHaveBeenCalled();
    expect(fold.play).toHaveBeenCalledTimes(1);
  });

  test("Plays winner select sound when a player wins before a showdown", () => {
    jest.useFakeTimers();

    receiveMessage(
      {
        method: "finalInfo",
        showInfo: { boardCardInfo: ["10c", "Ad", "Ac", null, null] },
        win_amount: 1000, //eslint-disable-line @typescript-eslint/camelcase
        winners: [0]
      },
      0
    );

    jest.runAllTimers();

    expect(winnerSelect.play).toHaveBeenCalled();
    expect(winnerSelect.play).toHaveBeenCalledTimes(1);
  });

  test("Plays all the sounds when an all-in happens", () => {
    jest.useFakeTimers();

    receiveMessage(
      {
        method: "finalInfo",
        showInfo: { boardCardInfo: ["10c", "Ad", "Ac", "Kd", "9d"] },
        win_amount: 1000, //eslint-disable-line @typescript-eslint/camelcase
        winners: [0]
      },
      0
    );

    jest.runAllTimers();

    expect(showFlop.play).toHaveBeenCalled();
    expect(showFlop.play).toHaveBeenCalledTimes(1);
    expect(cardDrop.play).toHaveBeenCalled();
    expect(cardDrop.play).toHaveBeenCalledTimes(2);
    expect(winnerSelect.play).toHaveBeenCalled();
    expect(winnerSelect.play).toHaveBeenCalledTimes(1);
  });

  // Sounds from actions.ts

  test("Plays the flop sounds with chips collection", () => {
    const stateToTest = {
      ...state,
      players: {
        ...state.players,
        player1: { ...state.players.player1, betAmount: 100 },
        player2: { ...state.players.player2, betAmount: 100 }
      }
    };
    jest.useFakeTimers();

    receiveMessage(
      {
        method: "deal",
        deal: {
          board: ["Kd", "Ad", "9d"],
          balance: 100,
          holecards: ["Ac", "Kc"]
        }
      },
      0,
      stateToTest
    );

    jest.runAllTimers();

    expect(showFlop.play).toHaveBeenCalled();
    expect(showFlop.play).toHaveBeenCalledTimes(1);
  });

  test("Plays the turn sound", () => {
    const stateToTest = {
      ...state,
      boardCards: ["Kd", "Ad", "9d"],
      gameTurn: GameTurns.flop
    };
    jest.useFakeTimers();

    receiveMessage(
      {
        method: "deal",
        deal: {
          board: ["Kd", "Ad", "9d", "9c"],
          balance: 100,
          holecards: ["Ac", "Kc"]
        }
      },
      0,
      stateToTest
    );

    jest.runAllTimers();

    expect(cardDrop.play).toHaveBeenCalled();
    expect(cardDrop.play).toHaveBeenCalledTimes(1);
  });

  test("Plays the river sound", () => {
    const stateToTest = {
      ...state,
      boardCards: ["Kd", "Ad", "9d", "9c"],
      gameTurn: GameTurns.turn
    };

    receiveMessage(
      {
        method: "deal",
        deal: {
          board: ["Kd", "Ad", "9d", "9c", "8d"],
          balance: 100,
          holecards: ["Ac", "Kc"]
        }
      },
      0,
      stateToTest
    );

    expect(cardDrop.play).toHaveBeenCalled();
    expect(cardDrop.play).toHaveBeenCalledTimes(1);
  });

  test("Plays the chips collection sound", () => {
    const stateToTest = {
      ...state,
      players: {
        ...state.players,
        player1: { ...state.players.player1, betAmount: 100 },
        player2: { ...state.players.player2, betAmount: 100 }
      }
    };
    jest.useFakeTimers();

    receiveMessage(
      {
        method: "deal",
        deal: {
          board: ["Kd", "Ad", "9d"],
          balance: 100,
          holecards: ["Ac", "Kc"]
        }
      },
      0,
      stateToTest
    );

    jest.runAllTimers();

    expect(collectChips.play).toHaveBeenCalled();
    expect(collectChips.play).toHaveBeenCalledTimes(1);
  });
});
