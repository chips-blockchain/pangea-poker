/*eslint-disable @typescript-eslint/camelcase*/

import { IMessage, onMessage } from "../onMessage";
import state from "../../../store/testState";
import { IState } from "../../../store/types";
import * as actions from "../../../store/actions";
import { IncomingMessage } from "electron";

const dispatch = jest.fn();
const updateStateValueSpy = jest.spyOn(actions, "updateStateValue");

export const receiveMessage = (
  message: IMessage,
  userSeat: number,
  stateToTest: IState = state
): void => {
  const {
    action,
    amount,
    addr,
    backend_status,
    balance,
    big_blind,
    bet_amount,
    deal,
    max_players,
    method,
    playerid,
    possibilities,
    showInfo,
    small_blind,
    table_stack_in_chips,
    win_amount,
    winners
  } = message;
  
  const msg: IMessage = {
    action,
    addr,
    amount,
    backend_status,
    balance,
    big_blind,
    bet_amount,
    deal,
    max_players,
    method,
    playerid,
    possibilities,
    showInfo,
    small_blind,
    table_stack_in_chips,
    win_amount,
    winners
  }
  onMessage(
    msg,
    'player',
    stateToTest,
    dispatch
  );
};

/**
 * Active Player Handling
 * Active user is player id: 1
 * State userSeat is player1
 */
describe("Active player handling", () => {
  const setActivePlayerSpy = jest.spyOn(actions, "setActivePlayer");
  const showControlsSpy = jest.spyOn(actions, "showControls");

  const round_betting_message = {
    action: "round_betting",
    method: "betting",
    playerid: 0,
    possibilities: [4, 5, 6]
  };

  test("reveal the controls for the player at userSeat", () => {
    // userSeat is playerid + 1
    receiveMessage(round_betting_message, 1);
    expect(showControlsSpy).toHaveBeenCalledTimes(1);
    expect(showControlsSpy).toHaveBeenCalledWith(true, dispatch);
  });

  test("does not reveal the controls when it's the opponent's turn", () => {
    receiveMessage(
      {
        ...round_betting_message,
        playerid: 1
      },
      1
    );
    expect(showControlsSpy).toHaveBeenCalledTimes(0);

    receiveMessage(
      {
        ...round_betting_message,
        playerid: 3
      },
      1
    );
    expect(showControlsSpy).toHaveBeenCalledTimes(0);

    receiveMessage(
      {
        ...round_betting_message,
        playerid: 6
      },
      1
    );
    expect(showControlsSpy).toHaveBeenCalledTimes(0);
  });

  test("highlights the correct active player", () => {
    receiveMessage(round_betting_message, 1);
    expect(setActivePlayerSpy).toHaveBeenCalledTimes(1);
    expect(setActivePlayerSpy).toHaveBeenCalledWith("player1", dispatch);
  });
});

// Hand History
describe("handHistory", () => {
  const addToHandHistorySpy = jest.spyOn(actions, "addToHandHistory");
  const small_blind_message = {
    action: "small_blind_bet",
    method: "betting",
    amount: 2,
    playerid: 0
  };
  const blinds_info = {
    method: "blindsInfo",
    small_blind: 2,
    big_blind: 4
  };
  const big_blind_message = {
    action: "big_blind_bet",
    method: "betting",
    // @todo the amount is being sent from the backend
    // check if it fits the big/small blind which was set before???
    amount: 4,
    playerid: 1
  };

  test("logs posting the blinds from the Small Blind's perspective", () => {
    state.blinds = [2, 4];
    receiveMessage(small_blind_message, 1);
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
    state.blinds = [2, 4];
    receiveMessage(big_blind_message, 1);

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
    const table_stack_in_chips = 10;
    const backend_status = 1;
    const max_players = 2;
    receiveMessage(
      {
        method: "walletInfo",
        addr: address,
        balance,
        table_stack_in_chips,
        backend_status,
        max_players
      },
      0
    );

    expect(updateStateValueSpy).toHaveBeenCalled();
    expect(updateStateValueSpy).toHaveBeenCalledTimes(5);
    expect(updateStateValueSpy).toHaveBeenCalledWith(
      "currentChipsStack",
      table_stack_in_chips,
      dispatch
    );
    expect(updateStateValueSpy).toHaveBeenCalledWith(
      "backendStatus",
      backend_status,
      dispatch
    );
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
    expect(updateStateValueSpy).toHaveBeenCalledWith(
      "maxPlayers",
      max_players,
      dispatch
    );
  });
});
