import theme from "../../styles/theme";
import playerIdToString from "../../lib/playerIdToString";
const GameAPI = {};

GameAPI.bet = function(player, betAmount, state, dispatch) {
  let stringId = playerIdToString(player);
  let reducedChips = state.players[stringId].chips - betAmount;
  dispatch({
    type: "bet",
    payload: {
      player: stringId,
      betAmount,
      chips: reducedChips
    }
  });
  GameAPI.updatePot(betAmount, state, dispatch);
};

GameAPI.chat = function(text, color, message) {
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

GameAPI.deal = function(message, state, dispatch) {
  console.log("GameAPI.deal");
  if (message.deal.dealer !== null) {
    GameAPI.chat(`The dealer is player${message.deal.dealer + 1}.`, "info");
    GameAPI.setDealer(message.deal.dealer, state, dispatch);
  }
  if (message.deal.holecards) {
    console.log(message.deal.holecards);
  }
  if (message.deal.board) {
    console.log(message.deal.board);
  }
  // function dealer(new_dealer) {
  //   GameAPI.setDealer(new_dealer, state, dispatch);
  // }
  // function holecards(new_cards) {
  //   // 1. Set all playerCards to null
  //   // 2. Set the holeCards to the new_cards array
  //   // 3. Set the user's playerCards equal to the holeCards
  //   for (var seat in pangea.seats) {
  //     pangea.seats[seat].playercaZrds = null;
  //     pangea.player.holecards = new_cards;
  //     if (seat == pangea.player.seat) {
  //       pangea.seats[seat].playercards = pangea.player.holecards;
  //     }
  //   }
  //   is_holecards = true;
  // }
  // function boardcards(new_card) {
  //   for (var position in new_card) {
  //     pangea.boardcards[position].card = new_card[position];
  //   }
  // }
  // var is_holecards = false;
  // var newholecards = [];
  // var handlers = { holecards: holecards, dealer: dealer, board: boardcards };
  // for (var key in message) {
  //   if (message.hasOwnProperty(key)) {
  //     var handler = handlers[key];
  //     handler(message[key]);
  //   }
  // }
  // if (is_holecards) {
  //   console.log("pangea.gui.dealcards");
  //   //pangea.gui.dealcards()
  //   pangea.gui.bet_dealcards();
  // }
  // pangea.update();
};

GameAPI.dealCards = (state, dispatch) =>
  dispatch({
    type: "dealCards"
  });

GameAPI.game = function(gameObject, state, dispatch) {
  if (state.gameStarted === false) {
    dispatch({
      type: "startGame",
      payload: {
        gameType: gameObject.gametype,
        pot: gameObject.pot,
        toCall: gameObject.tocall
      }
    });
  }
};

GameAPI.playerJoin = function(player, state, dispatch) {
  let id = player.slice(-1) - 1;
  GameAPI.sendMessage(
    { method: "player_join", gui_playerID: id },
    player,
    state,
    dispatch
  );
};

GameAPI.seats = function(seatsArray, state, dispatch) {
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

GameAPI.sendMessage = function(message, node, state, dispatch) {
  if (state.connection[node] === "Connected") {
    dispatch({
      type: "sendMessage",
      payload: {
        node: [node],
        message: JSON.stringify(message)
      }
    });
  } else alert(`Error: ${node} is not connected.`);
};

GameAPI.setDealer = function(player, state, dispatch) {
  dispatch({
    type: "setDealer",
    payload: player
  });
};

GameAPI.setLastAction = function(player, action, state, dispatch) {
  dispatch({
    type: "setLastAction",
    payload: {
      player,
      action
    }
  });
};

GameAPI.setUserSeat = function(player, state, dispatch) {
  dispatch({
    type: "setUserSeat",
    payload: player
  });
};

GameAPI.updatePot = function(betAmount, state, dispatch) {
  let updatedPot = [];
  updatedPot[0] = state.pot[0] + betAmount;
  console.log(updatedPot);
  dispatch({
    type: "updatePot",
    payload: updatedPot
  });
};

export default GameAPI;
