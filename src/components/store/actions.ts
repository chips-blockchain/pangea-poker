/* eslint-disable no-use-before-define */
import theme from "../../styles/theme";
import playerIdToString from "../../lib/playerIdToString";
import { State } from "./initialState";

interface Message {
  method: string;
  [key: string]: any;
}

// Update the player's current betAmount
export const bet = (
  player: string | number,
  betAmount: number,
  state: State,
  dispatch: Function
): void => {
  // Convert the player parameter to a string if needed
  if (typeof player === "number") {
    player = playerIdToString(player);
  }

  // Calculate the total chips which includes the current
  const totalChips =
    state.players[player].chips + state.players[player].betAmount;

  // Calculate the remaining chips
  const remainingChips = totalChips - betAmount;

  dispatch({
    type: "bet",
    payload: {
      player,
      betAmount,
      chips: remainingChips
    }
  });
};

// A colored console.log
export const log = (text: string, color: string, message: Message): void => {
  console.log(
    "%c" + text,
    `color: ${
      color === "sent"
        ? theme.moon.colors.accent
        : color === "info"
        ? "#89ca77"
        : color === "received"
        ? "#e0be1d"
        : color === "danger"
        ? theme.moon.colors.danger
        : ""
    }; background-color: #2a2b2e;`,
    message ? message : ""
  );
};

// Collect the chips from the player before a new turn
export const collectChips = (state: State, dispatch: Function): void => {
  dispatch({
    type: "collectChips"
  });
  // Show the main pot with a slight delay, so it appears when the chips collection animation finishes
  !state.showMainPot && setTimeout(() => toggleMainPot(dispatch), 400);
};

// Process the deal message from the backend. It's responsible for setting up the board cards.
export const deal = (
  message: Message,
  state: State,
  dispatch: Function
): void => {
  // Set the dealer
  if (message.deal.dealer !== null) {
    log(`The dealer is player${message.deal.dealer + 1}.`, "info", undefined);
    setDealer(message.deal.dealer, dispatch);
  }
  if (message.deal.holecards.length === 2)
    setHoleCards(message.deal.holecards, dispatch);

  if (message.deal.board) {
    // Flop
    if (state.gameTurn === 0 && message.deal.board.length === 3) {
      setBoardCards(message.deal.board, dispatch);
      nextTurn(1, state, dispatch);
      log(`Here's the flop.`, "info", undefined);
    }
    // Turn
    if (state.gameTurn === 1 && message.deal.board.length === 4) {
      setBoardCards(message.deal.board, dispatch);
      nextTurn(2, state, dispatch);
      log(`Here's the turn.`, "info", undefined);
    }
    // River
    if (state.gameTurn === 2 && message.deal.board.length === 5) {
      setBoardCards(message.deal.board, dispatch);
      nextTurn(3, state, dispatch);
      log(`Here's the river.`, "info", undefined);
    }
  }
};

// Trigger the card deal animation
export const dealCards = (dispatch: Function): void => {
  dispatch({
    type: "dealCards"
  });
};

// Set up the state for Developer Mode
export const devStart = (dispatch: Function): void => {
  dispatch({
    type: "devStart"
  });
};

// Fold player action
export const fold = (player: string, dispatch: Function): void => {
  dispatch({
    type: "fold",
    payload: player
  });
};

// Initialize the game
export const game = (
  gameObject: { gametype: string; pot: number[] },
  state: State,
  dispatch: Function
): void => {
  if (state.gameStarted === false) {
    dispatch({
      type: "startGame",
      payload: {
        gameType: gameObject.gametype,
        pot: gameObject.pot
      }
    });
  }
};

//
export const nextTurn = (
  turn: number,
  state: State,
  dispatch: Function
): void => {
  collectChips(state, dispatch);
  setActivePlayer(null, dispatch);
  setTimeout(() => {
    updateGameTurn(turn, dispatch);
  }, 400);
  setTimeout(() => {
    resetTurn(state.blinds[1], dispatch);
  }, 1000);
  setLastAction(1, null, dispatch);
};

export const nextHand = (state: State, dispatch: Function): void => {
  setActivePlayer(null, dispatch);
  updateGameTurn(0, dispatch);
  resetTurn(state.blinds[1], dispatch);
  dispatch({
    type: "resetHand"
  });
};

export const playerJoin = (
  player: string,
  state: State,
  dispatch: Function
): void => {
  const id = Number(player.slice(-1)) - 1;
  sendMessage(
    { method: "player_join", gui_playerID: id },
    player,
    state,
    dispatch
  );
};

export const resetMessage = (
  message: Message,
  node: string,
  dispatch: Function
): void => {
  dispatch({
    type: "setMessage",
    payload: {
      node: [node],
      message: JSON.stringify(message)
    }
  });
};

export const resetTurn = (bigBlind: number, dispatch: Function): void => {
  dispatch({
    type: "resetTurn",
    payload: bigBlind
  });
};

export const seats = (
  seatsArray: [{ name: string; playing: number; seat: number }],
  dispatch: Function
): void => {
  seatsArray.map(seat => {
    dispatch({
      type: "updateSeats",
      payload: {
        isPlaying: seat.playing === 1 ? true : false,
        player: seat.name,
        seat: `player${seat.seat + 1}`
      }
    });
  });
};

export const setActivePlayer = (player: string, dispatch: Function): void => {
  dispatch({
    type: "setActivePlayer",
    payload: player
  });
};

export const setBalance = (
  player: string,
  balance: number,
  dispatch: Function
): void => {
  dispatch({
    type: "setBalance",
    payload: { player, balance }
  });
};

export const setBoardCards = (
  boardCards: string[],
  dispatch: Function
): void => {
  dispatch({
    type: "setBoardCards",
    payload: boardCards
  });
};

export const sendMessage = (
  message: Message,
  node: string,
  state: State,
  dispatch: Function
): void => {
  if (state.connection[node] === "Connected") {
    dispatch({
      type: "setMessage",
      payload: {
        node: [node],
        message: JSON.stringify(message)
      }
    });
  } else !state.isDeveloperMode && alert(`Error: ${node} is not connected.`);
};

export const setMinRaise = (amount: number, dispatch: Function): void => {
  dispatch({
    type: "setMinRaise",
    payload: amount
  });
};

export const setToCall = (amount: number, dispatch: Function): void => {
  dispatch({
    type: "setToCall",
    payload: amount
  });
};

export const setDealer = (player: number, dispatch: Function): void => {
  dispatch({
    type: "setDealer",
    payload: player
  });
};

export const setHoleCards = (holeCards: string[], dispatch: Function): void => {
  dispatch({
    type: "setHoleCards",
    payload: holeCards
  });
};

export const setLastAction = (
  player: number,
  action: string | null,
  dispatch: Function
): void => {
  dispatch({
    type: "setLastAction",
    payload: {
      player,
      action
    }
  });
};

export const setLastMessage = (message: Message, dispatch: Function): void => {
  dispatch({
    type: "setLastMessage",
    payload: message
  });
};

export const setUserSeat = (player: string, dispatch: Function): void => {
  dispatch({
    type: "setUserSeat",
    payload: player
  });
};

export const setWinner = (
  player: Message,
  state: State,
  dispatch: Function
): void => {
  const winner = playerIdToString(player.playerID);
  console.log(`The winner is ${winner}.`);
  nextTurn(4, state, dispatch);
  setTimeout(() => {
    dispatch({
      type: "setWinner",
      payload: winner
    });
  }, 1000);
};

export const showControls = (show: boolean, dispatch: Function) => {
  dispatch({
    type: "showControls",
    payload: show
  });
};

export const toggleMainPot = (dispatch: Function) => {
  dispatch({
    type: "toggleMainPot"
  });
};

export const updateGameTurn = (turn: number, dispatch: Function): void => {
  dispatch({
    type: "updateGameTurn",
    payload: turn
  });
};

export const updateMainPot = (amount: number, dispatch: Function): void => {
  dispatch({
    type: "updateMainPot",
    payload: amount
  });
};

export const updateTotalPot = (amount: number, dispatch: Function): void => {
  dispatch({
    type: "updateTotalPot",
    payload: amount
  });
};

export const updateStateValue = (
  key: string,
  value: any,
  dispatch: Function
): void => {
  dispatch({
    type: "updateStateValue",
    payload: { key, value }
  });
};
