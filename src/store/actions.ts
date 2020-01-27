/* eslint-disable @typescript-eslint/no-use-before-define */
import theme from "../styles/theme";
import playerIdToString from "../lib/playerIdToString";
import lowerCaseLastLetter from "../lib/lowerCaseLastLetter";
import { IState } from "./initialState";
import { IMessage } from "../components/Game/onMessage";
import { Possibilities, GameTurns } from "../lib/constants";
import sounds from "../sounds/sounds";

const { preFlop, flop, turn } = GameTurns;

// Add logs to the hand history to display them in the LogBox
export const addToHandHistory = (
  lastAction: string,
  dispatch: Function
): void => {
  dispatch({
    type: "addToHandHistory",
    payload: lastAction
  });
};

// Update the player's current betAmount
export const bet = (
  player: string | number,
  betAmount: number,
  state: IState,
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
export const log = (text: string, color: string, message?: IMessage): void => {
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
export const collectChips = (state: IState, dispatch: Function): void => {
  dispatch({
    type: "collectChips"
  });
  // Show the main pot with a slight delay, so it appears when the chips collection animation finishes
  !state.showMainPot && setTimeout(() => toggleMainPot(dispatch), 400);

  // Playe the sound if there are bets
  const playerStates = Object.entries(state.players).map(p => p[1]);
  const noBets = playerStates.every(player => player["betAmount"] === 0);
  if (!noBets && !state.chipsCollected) {
    sounds.collectChips.play();
  }
};

export const connectPlayer = (player: string, dispatch: Function): void => {
  dispatch({
    type: "connectPlayer",
    payload: player
  });
};

// Closes the Startup Modal
export const closeStartupModal = (dispatch: Function) => {
  dispatch({
    type: "closeStartupModal"
  });
};

// Process the deal message from the backend. It's responsible for setting up the board cards.
export const deal = (
  message: IMessage,
  state: IState,
  dispatch: Function
): void => {
  const { holecards, board } = message.deal;
  const { gameTurn } = state;

  // Set the holecards
  if (holecards.length === 2) setHoleCards(holecards, dispatch);
  if (board) {
    // Flop
    if (gameTurn === preFlop && board.length === 3) {
      setBoardCards(board, dispatch);
      nextTurn(1, state, dispatch);
      addToHandHistory(
        `The flop is ${lowerCaseLastLetter(board[0])}, ${lowerCaseLastLetter(
          board[1]
        )}, ${lowerCaseLastLetter(board[2])}.`,
        dispatch
      );
      setTimeout(() => {
        sounds.showFlop.play();
      }, 1000);
    }

    // Turn
    if (gameTurn === flop && board.length === 4) {
      setBoardCards(board, dispatch);
      nextTurn(2, state, dispatch);
      addToHandHistory(
        `The turn is ${lowerCaseLastLetter(board[3])}.`,
        dispatch
      );
      sounds.cardDrop.play();
    }

    // River
    if (gameTurn === turn && board.length === 5) {
      setBoardCards(board, dispatch);
      nextTurn(3, state, dispatch);
      addToHandHistory(
        `The river is ${lowerCaseLastLetter(board[4])}.`,
        dispatch
      );
      sounds.cardDrop.play();
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

// Triggers the showDown
export const doShowDown = (allHoleCardsInfo: string[], dispatch: Function) => {
  dispatch({
    type: "doShowDown",
    payload: allHoleCardsInfo
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
  state: IState,
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
  state: IState,
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

export const nextHand = (state: IState, dispatch: Function): void => {
  setActivePlayer(null, dispatch);
  updateGameTurn(0, dispatch);
  resetTurn(state.blinds[1], dispatch);
  dispatch({
    type: "resetHand"
  });
};

export const playerJoin = (
  player: string,
  state: IState,
  dispatch: Function
): void => {
  const id = Number(player.slice(-1)) - 1;
  sendMessage(
    { method: "player_join", gui_playerID: id }, //eslint-disable-line @typescript-eslint/camelcase
    player,
    state,
    dispatch
  );
};

// Defines which buttons to show in Controls by processsing the possibilities array
export const processControls = (
  receivedPossibilities: number[],
  dispatch: Function
): void => {
  const canCheck = receivedPossibilities.some(
    poss => poss === Possibilities.check
  );
  const canRaise = receivedPossibilities.some(
    poss => poss === Possibilities.raise
  );

  dispatch({
    type: "processControls",
    payload: {
      canCheck,
      canRaise
    }
  });
};

export const resetMessage = (node: string, dispatch: Function): void => {
  dispatch({
    type: "setMessage",
    payload: {
      node: [node],
      message: null
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

export const sendMessage = (
  message: IMessage,
  node: string,
  state: IState,
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

export const setBlinds = (
  blinds: [number, number],
  dispatch: Function
): void => {
  dispatch({
    type: "setBlinds",
    payload: blinds
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
  action: string | IMessage | null,
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

export const setLastMessage = (message: IMessage, dispatch: Function): void => {
  dispatch({
    type: "setLastMessage",
    payload: message
  });
};

export const setMinRaiseTo = (amount: number, dispatch: Function): void => {
  dispatch({
    type: "setMinRaiseTo",
    payload: amount
  });
};

export const setToCall = (amount: number, dispatch: Function): void => {
  dispatch({
    type: "setToCall",
    payload: amount
  });
};

export const setUserSeat = (player: string, dispatch: Function): void => {
  dispatch({
    type: "setUserSeat",
    payload: player
  });
};

export const setWinner = (
  winnerArray: number[],
  winAmount: number,
  state: IState,
  dispatch: Function
): void => {
  const winners: string[] = winnerArray.map(player => playerIdToString(player));
  nextTurn(4, state, dispatch);
  setTimeout(() => {
    dispatch({
      type: "setWinner",
      payload: { winners, winAmount }
    });
  }, 1000);
};

export const showControls = (show: boolean, dispatch: Function): void => {
  dispatch({
    type: "showControls",
    payload: show
  });
};

export const toggleMainPot = (dispatch: Function): void => {
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
