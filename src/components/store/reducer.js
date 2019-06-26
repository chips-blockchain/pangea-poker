const reducer = (state, action) => {
  switch (action.type) {
    case "connect": {
      return {
        ...state,
        connection: {
          ...state.connection,
          [action.payload.nodeName]: action.payload.readyState
        }
      };
    }
    case "sendMessage": {
      return {
        ...state,
        message: {
          ...state.message,
          [action.payload.node]: action.payload.message
        }
      };
    }
    case "startGame": {
      return {
        ...state,
        gameType: action.payload.gameType,
        gameStarted: true,
        pot: action.payload.pot,
        toCall: action.payload.toCall,
        options: {
          ...state.options,
          showPot: true,
          showPotCounter: true
        }
      };
    }
    case "updateSeats": {
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.player]: {
            ...state.players[action.payload.player],
            isPlaying: action.payload.isPlaying,
            player: action.payload.player,
            chips: action.payload.chips,
            seat: action.payload.seat
          }
        }
      };
    }
    case "setUserSeat": {
      return {
        ...state,
        userSeat: action.payload.userSeat,
        [action.payload]: {
          ...state.players[action.payload],
          showCards: true
        }
      };
    }
    case "setActivePlayer": {
      return {
        ...state,
        activePlayer: action.payload
      };
    }
    case "setDealer": {
      return {
        ...state,
        dealer: action.payload,
        showDealer: true
      };
    }
    case "dealCards": {
      return {
        ...state,
        cardsDealt: true
      };
    }
    case "Fold": {
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload]: {
            ...state.players[action.payload],
            hasCards: false
          }
        }
      };
    }

    default:
      throw new Error("Action type is required");
  }
};

export default reducer;
