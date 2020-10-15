/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/camelcase */
import playerIdToString from "../lib/playerIdToString";
import lowerCaseLastLetter from "../lib/lowerCaseLastLetter";
import { IState } from "./types";
import { IMessage } from "../components/Game/types/IMessage";
import { Possibilities, GameTurns, Level, Conn } from "../lib/constants";
import sounds from "../sounds/sounds";
import log from "../lib/dev";
import { INotice } from "../components/Table/assets/types";
import notifications from "../config/notifications.json";
import { Node } from "../lib/constants";

const { preFlop, flop, turn } = GameTurns;

// Add logs to the hand history to display them in the LogBox
export const addToHandHistory = (
  lastAction: string,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "addToHandHistory",
    payload: lastAction
  });
};

export const backendStatus = (
  state: IState,
  dispatch: (arg: object) => void
): void => {
  sendMessage({ method: "backend_status" }, state, dispatch);
};

// Update the player's current betAmount
export const bet = (
  player: string | number,
  betAmount: number,
  state: IState,
  dispatch: (arg: object) => void
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

// Collect the chips from the player before a new turn
export const collectChips = (
  state: IState,
  dispatch: (arg: object) => void
): void => {
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

export const connectPlayer = (
  player: string,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "connectPlayer",
    payload: player
  });
};

export const clearNotice = (dispatch: (arg: object) => void): void => {
  dispatch({
    type: "clearNotice"
  });
};

// Closes the Startup Modal
export const closeStartupModal = (dispatch: (arg: object) => void): void => {
  dispatch({
    type: "closeStartupModal"
  });
};

// Process the deal message from the backend. It's responsible for setting up the board cards.
export const deal = (
  message: IMessage,
  state: IState,
  dispatch: (arg: object) => void
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
export const dealCards = (dispatch: (arg: object) => void): void => {
  dispatch({
    type: "dealCards"
  });
};

// Set up the state for Developer Mode
export const devStart = (dispatch: (arg: object) => void): void => {
  dispatch({
    type: "devStart"
  });
};

// Triggers the showDown
export const doShowDown = (
  allHoleCardsInfo: string[][],
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "doShowDown",
    payload: allHoleCardsInfo
  });
};

// Fold player action
export const fold = (player: string, dispatch: (arg: object) => void): void => {
  dispatch({
    type: "fold",
    payload: player
  });
};

// Initialize the game
export const game = (
  gameObject: { gametype: string; pot: number[] },
  state: IState,
  dispatch: (arg: object) => void
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
  dispatch: (arg: object) => void
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

export const nextHand = (
  state: IState,
  dispatch: (arg: object) => void
): void => {
  setActivePlayer(null, dispatch);
  updateGameTurn(0, dispatch);
  resetTurn(state.blinds[1], dispatch);
  dispatch({
    type: "resetHand"
  });
};

export const playerJoin = (
  seat: string,
  state: IState,
  dispatch: (arg: object) => void
): void => {
  // subtract 1 because backend seat numbers start from 0
  const id = Number(seat.slice(-1));
  sendMessage({ method: "player_join", gui_playerID: id }, state, dispatch);
};

// Defines which buttons to show in Controls by processsing the possibilities array
export const processControls = (
  receivedPossibilities: number[],
  dispatch: (arg: object) => void
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

export const resetMessage = (
  node: string,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setMessage",
    payload: {
      node: [node],
      message: null
    }
  });
};

export const resetTurn = (
  bigBlind: number,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "resetTurn",
    payload: bigBlind
  });
};

export const seats = (
  seatsArray: [{ name: string; playing: number; seat: number }],
  dispatch: (arg: object) => void
): void => {
  if (!seatsArray) {
    console.warn("The seats method is empty.");
    return;
  }
  seatsArray.map(seat => {
    dispatch({
      type: "updateSeats",
      payload: {
        isPlaying: !seat.playing,
        player: seat.name,
        seat: `player${seat.seat + 1}`,
        chips: seat.chips,
        connected: !seat.empty
      }
    });
  });
};

/**
 *
 * All the messages are automatically send to playerWrite unless specified using node parameter
 *
 * @param message The message being sent through the socket, usually an object
 * @param state   Application state
 * @param dispatch
 * @param node    player|dcv (playerRead|playerWrite)
 */
export const sendMessage = (
  message: IMessage,
  state: IState,
  dispatch: (arg: object) => void,
  node?: Node
): void => {
  if (!node) {
    node = Node.playerWrite;
  }
  if (
    state.connectionStatus.status === Conn.connected ||
    (state.players[node] && state.players[node].connected)
  ) {
    const m = {
      type: "setMessage",
      payload: {
        node: [node],
        message: JSON.stringify(message)
      }
    };
    dispatch(m);
    log(`${Date.now()}: Sent to ${node}: `, "sent", m);
  } else !state.isDeveloperMode && alert(`Error: ${node} is not connected.`);
};

export const sendInitMessage = (
  readyStateString: string,
  node: string,
  dispatch: (arg: object) => void
): void => {
  const m = {
    type: "connect",
    payload: {
      nodeName: node,
      readyState: readyStateString
    }
  };
  log(`Sent to ${node}: `, "sent", "connect");
  dispatch(m);
};

export const setActivePlayer = (
  player: string,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setActivePlayer",
    payload: player
  });
};

export const setBalance = (
  player: string,
  balance: number,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setBalance",
    payload: { player, balance }
  });
};

export const setBlinds = (
  blinds: [number, number],
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setBlinds",
    payload: blinds
  });
};

export const setBoardCards = (
  boardCards: string[],
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setBoardCards",
    payload: boardCards
  });
};

export const setDealer = (
  player: number,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setDealer",
    payload: player
  });
};

export const setHoleCards = (
  holeCards: string[],
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setHoleCards",
    payload: holeCards
  });
};

export const setLastAction = (
  player: number,
  action: string | IMessage | null,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setLastAction",
    payload: {
      player,
      action
    }
  });
};

export const setLastMessage = (
  message: IMessage,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setLastMessage",
    payload: message
  });
};

export const setMinRaiseTo = (
  amount: number,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setMinRaiseTo",
    payload: amount
  });
};

export const setNotice = (
  notice: INotice,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setNotice",
    payload: {
      ...notice
    }
  });
};

export const setToCall = (
  amount: number,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setToCall",
    payload: amount
  });
};

export const setUserSeat = (
  player: string,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "setUserSeat",
    payload: player
  });
};

export const setWinner = (
  winnerArray: number[],
  winAmount: number,
  state: IState,
  dispatch: (arg: object) => void
): void => {
  const winners: string[] = winnerArray.map(playerIdToString);
  nextTurn(4, state, dispatch);
  setTimeout(() => {
    dispatch({
      type: "setWinner",
      payload: { winners, winAmount }
    });
  }, 1000);
};

export const showControls = (
  show: boolean,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "showControls",
    payload: show
  });
};

export const toggleMainPot = (dispatch: (arg: object) => void): void => {
  dispatch({
    type: "toggleMainPot"
  });
};

export const updateConnectionStatus = (
  status: string,
  dispatch: (arg: object) => void
): void => {
  const level = status === Conn.disconnected ? Level.error : Level.warning;
  const text =
    status === Conn.disconnected ? notifications.CONNECTION_FAILED : status;
  dispatch({
    type: "updateConnectionStatus",
    payload: {
      level,
      status,
      text
    }
  });
};

export const updateSocketConnection = (
  connection: string,
  nodeName: string,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "updateSocketConnection",
    payload: {
      connection,
      nodeName
    }
  });
};

export const updateGameTurn = (
  turn: number,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "updateGameTurn",
    payload: turn
  });
};

export const updateMainPot = (
  amount: number,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "updateMainPot",
    payload: amount
  });
};

export const updateTotalPot = (
  amount: number,
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "updateTotalPot",
    payload: amount
  });
};

export const updateStateValue = (
  key: string,
  value: string | number | [] | {},
  dispatch: (arg: object) => void
): void => {
  dispatch({
    type: "updateStateValue",
    payload: { key, value }
  });
};

export const walletInfo = (
  state: IState,
  dispatch: (arg: object) => void
): void => {
  // const id = Number(seat.slice(-1)) - 1;
  sendMessage({ method: "walletInfo" }, state, dispatch);
};
