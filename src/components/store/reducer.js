const reducer = (state, action) => {
  switch (action.type) {
    case "Connect": {
      return {
        ...state,
        connection: {
          ...state.connection,
          [action.payload.nodeName]: action.payload.readyState
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
