const reducer = (state, action) => {
  switch (action.type) {
    case "bet": {
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.player]: {
            ...state.players[action.payload.player],
            isBetting: true,
            betAmount: action.payload.betAmount,
            chips: action.payload.chips
          }
        }
      };
    }
    case "collectChips": {
      return {
        ...state,
        chipsCollected: true
      };
    }
    case "connect": {
      return {
        ...state,
        connection: {
          ...state.connection,
          [action.payload.nodeName]: action.payload.readyState
        }
      };
    }
    case "dealCards": {
      return {
        ...state,
        cardsDealt: true
      };
    }
    case "setMessage": {
      return {
        ...state,
        message: {
          ...state.message,
          [action.payload.node]: action.payload.message
        }
      };
    }
    case "setActivePlayer": {
      return {
        ...state,
        activePlayer: action.payload
      };
    }
    case "setBalance": {
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload.player]: {
            ...state.players[action.payload.player],
            chips: action.payload.balance,
            connected: true
          }
        }
      };
    }
    case "setDealer": {
      return {
        ...state,
        dealer: action.payload,
        showDealer: true
      };
    }
    case "setHoleCards": {
      return {
        ...state,
        holeCards: action.payload
      };
    }

    case "setLastAction": {
      return {
        ...state,
        lastAction: {
          player: action.payload.player,
          action: action.payload.action
        }
      };
    }
    case "setLastMessage": {
      return {
        ...state,
        lastMessage: action.payload
      };
    }
    case "setUserSeat": {
      return {
        ...state,
        userSeat: action.payload,
        [action.payload]: {
          ...state.players[action.payload],
          showCards: true
        }
      };
    }
    case "toggleMainPot": {
      return {
        ...state,
        showMainPot: !state.showMainPot
      };
    }
    case "startGame": {
      return {
        ...state,
        gameType: action.payload.gameType,
        gameStarted: true,
        pot: action.payload.pot,
        // toCall: action.payload.toCall,
        options: {
          ...state.options,
          showPot: true,
          showPotCounter: true
        }
      };
    }
    case "toggleControls": {
      return {
        ...state,
        controls: {
          ...state.controls,
          showControls: !state.controls.showControls
        }
      };
    }
    case "updateGameTurn": {
      return {
        ...state,
        gameTurn: action.payload
      };
    }
    case "updateMainPot": {
      return {
        ...state,
        pot: [action.payload]
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
