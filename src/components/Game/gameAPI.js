import theme from "../../styles/theme";
import playerIdToString from "../../lib/playerIdToString";

export const bet = (player, betAmount, state, dispatch) => {
  if (typeof player === "number") {
    player = playerIdToString(player);
  }
  const totalChips =
    state.players[player].chips + state.players[player].betAmount;
  dispatch({
    type: "bet",
    payload: {
      player,
      betAmount: betAmount,
      chips: totalChips - betAmount
    }
  });
};

export const log = (text, color, message) => {
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

export const collectChips = (state, dispatch) => {
  dispatch({
    type: "collectChips"
  });
  !state.showMainPot && setTimeout(() => toggleMainPot(dispatch), 400);
};

export const deal = (message, state, dispatch) => {
  console.log("deal");
  if (message.deal.dealer !== null) {
    log(`The dealer is player${message.deal.dealer + 1}.`, "info");
    setDealer(message.deal.dealer, dispatch);
  }
  if (message.deal.holecards.length === 2) {
    setHoleCards(message.deal.holecards, dispatch);
  }
  if (message.deal.board) {
    if (state.gameTurn === 0 && message.deal.board.length === 3) {
      setBoardCards(message.deal.board, dispatch);
      nextTurn(1, state, dispatch);
    } else if (state.gameTurn === 1 && message.deal.board.length === 4) {
      setBoardCards(message.deal.board, dispatch);
      nextTurn(2, state, dispatch);
    } else if (state.gameTurn === 2 && message.deal.board.length === 5) {
      setBoardCards(message.deal.board, dispatch);
      nextTurn(3, state, dispatch);
    }
  }
};

export const dealCards = dispatch => {
  dispatch({
    type: "dealCards"
  });
};

export const game = (gameObject, state, dispatch) => {
  if (state.gameStarted === false) {
    dispatch({
      type: "startGame",
      payload: {
        gameType: gameObject.gametype,
        pot: gameObject.pot
        // toCall: gameObject.tocall
      }
    });
  }
};

export const nextTurn = (turn, state, dispatch) => {
  collectChips(state, dispatch);
  setActivePlayer(null, dispatch);
  setTimeout(() => {
    updateGameTurn(turn, dispatch);
  }, 400);
  setTimeout(() => {
    resetTurn(state.blinds[1], dispatch);
    // turn != 4 && toggleControls(dispatch);
  }, 1000);
  setLastAction(1, null, dispatch);
};

export const playerJoin = (player, state, dispatch) => {
  let id = player.slice(-1) - 1;
  sendMessage(
    { method: "player_join", gui_playerID: id },
    player,
    state,
    dispatch
  );
};

export const processControls = (message, state, dispatch) => {
  const allPossibilities = [
    "",
    "small_blind",
    "big_blind",
    "check",
    "raise",
    "call",
    "allin",
    "fold"
  ];

  // This is not being used temporarily
  if (message.possibilities) {
    message.possibilities.map(possibility => {
      allPossibilities[possibility] == "check" &&
        console.log("Check is an otpion");
      allPossibilities[possibility] == "raise" &&
        console.log("Raise is an otpion");
      allPossibilities[possibility] == "call" &&
        console.log("Call is an otpion");
      allPossibilities[possibility] == "allin" &&
        console.log("All-in is an otpion - but it's always an option lol");
      allPossibilities[possibility] == "fold" &&
        console.log("Fold is an otpion - which is always an option");
    });
  }
};

export const resetMessage = (message, node, dispatch) => {
  dispatch({
    type: "setMessage",
    payload: {
      node: [node],
      message: JSON.stringify(message)
    }
  });
};

export const resetTurn = (bigBlind, dispatch) => {
  dispatch({
    type: "resetTurn",
    payload: bigBlind
  });
};

export const seats = (seatsArray, dispatch) => {
  seatsArray.map(seat => {
    dispatch({
      type: "updateSeats",
      payload: {
        isPlaying: seat.playing === 1 ? true : false,
        player: seat.name,
        chips: seat.stack,
        seat: `player${seat.seat + 1}`
      }
    });
  });
};

export const setActivePlayer = (player, dispatch) => {
  dispatch({
    type: "setActivePlayer",
    payload: player
  });
};

export const setBalance = (player, balance, dispatch) => {
  dispatch({
    type: "setBalance",
    payload: { player, balance }
  });
};

export const setBoardCards = (boardCards, dispatch) => {
  dispatch({
    type: "setBoardCards",
    payload: boardCards
  });
};

export const sendMessage = (message, node, state, dispatch) => {
  if (state.connection[node] === "Connected") {
    dispatch({
      type: "setMessage",
      payload: {
        node: [node],
        message: JSON.stringify(message)
      }
    });
  } else alert(`Error: ${node} is not connected.`);
};

export const setMinRaise = (amount, dispatch) => {
  dispatch({
    type: "setMinRaise",
    payload: amount
  });
};

export const setToCall = (amount, dispatch) => {
  dispatch({
    type: "setToCall",
    payload: amount
  });
};

export const setDealer = (player, dispatch) => {
  dispatch({
    type: "setDealer",
    payload: player
  });
};

export const setHoleCards = (holeCards, dispatch) => {
  dispatch({
    type: "setHoleCards",
    payload: holeCards
  });
};

export const setLastAction = (player, action, dispatch) => {
  dispatch({
    type: "setLastAction",
    payload: {
      player,
      action
    }
  });
};

export const setLastMessage = (message, dispatch) => {
  dispatch({
    type: "setLastMessage",
    payload: message
  });
};

export const setUserSeat = (player, dispatch) => {
  dispatch({
    type: "setUserSeat",
    payload: player
  });
};
export const toggleControls = dispatch => {
  dispatch({
    type: "toggleControls"
  });
};

export const toggleMainPot = dispatch => {
  dispatch({
    type: "toggleMainPot"
  });
};

export const updateGameTurn = (turn, dispatch) => {
  dispatch({
    type: "updateGameTurn",
    payload: turn
  });
};

export const updateMainPot = (amount, dispatch) => {
  dispatch({
    type: "updateMainPot",
    payload: amount
  });
};
