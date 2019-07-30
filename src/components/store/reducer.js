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
    case "closeStartupModal": {
      return {
        ...state,
        isStartupModal: false
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
    case "devStart": {
      return {
        ...state,
        boardCards: ["Ad", "5c", "6c", "7d", "8d"],
        cardsDealt: true,
        holeCards: ["Ac", "Ad"],
        showDealer: true,
        showPot: true,
        gameStarted: true,
        players: {
          ...state.players,
          player1: {
            ...state.players.player1,
            isPlaying: true,
            connected: true
          },
          player2: {
            ...state.players.player2,
            isPlaying: true,
            connected: true
          }
        },
        options: {
          showPotCounter: true
        },
        controls: {
          showControls: true
        }
      };
    }
    case "fold": {
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
    case "resetTurn": {
      return {
        ...state,
        chipsCollected: false,
        toCall: 0,
        minRaise: action.payload,
        players: {
          ...state.players,
          player1: {
            ...state.players.player1,
            isBetting: false,
            betAmount: 0
          },
          player2: {
            ...state.players.player2,
            isBetting: false,
            betAmount: 0
          }
        }
      };
    }
    case "resetHand": {
      return {
        ...state,
        boardCards: [],
        holeCards: [],
        pot: [0],
        lastAction: { player: 0, action: null },
        minRaise: state.blinds[1] * 2,
        dealer: state.dealer === 0 ? 1 : 0,
        players: {
          ...state.players,
          player1: {
            ...state.players.player1,
            hasCards: false
          },
          player2: {
            ...state.players.player2,
            hasCards: false
          }
        }
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
    case "setNodeAdresses": {
      return {
        ...state,
        nodes: action.payload
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
    case "setBoardCards": {
      return {
        ...state,
        boardCards: action.payload
      };
    }
    case "setMinRaise": {
      return { ...state, minRaise: action.payload };
    }
    case "setToCall": {
      return { ...state, toCall: action.payload };
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
        players: {
          ...state.players,
          [action.payload]: {
            ...state.players[action.payload],
            showCards: true
          }
        }
      };
    }
    case "setWinner": {
      return { ...state, winner: action.payload };
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
    case "updateTotalPot": {
      return {
        ...state,
        totalPot: action.payload
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
            seat: action.payload.seat
          }
        }
      };
    }

    default:
      throw new Error("Action type is required");
  }
};

export default reducer;
