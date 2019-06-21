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
    case "toggleIsPlaying": {
      return {
        ...state,
        players: {
          ...state.players,
          [action.payload]: {
            ...state.players[action.payload],
            isPlaying: true
          }
        }
      };
    }
    case "setActivePlayer": {
      return {
        ...state,
        activePlayer: action.payload
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
