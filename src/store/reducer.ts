import { IState } from "./initialState";

interface IAction {
  payload: any;
  type: string;
}

const reducer: Function = (state: IState, action: IAction): object => {
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
        cardsDealt: false,
        dealer: state.dealer === 0 ? 1 : 0,
        handsPlayed: state.handsPlayed + 1,
        minRaise: state.blinds[1] * 2,
        holeCards: [],
        pot: [0],
        lastAction: { player: 0, action: null },
        toCall: 2000000
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
    case "setBlinds": {
      return {
        ...state,
        blinds: action.payload
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
    case "setNodeAdresses": {
      return {
        ...state,
        nodes: action.payload
      };
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
    case "showDown": {
      return {
        ...state,
        players: {
          ...state.players,
          player1: {
            ...state.players.player1,
            playerCards: action.payload[0],
            showCards: true
          },
          player2: {
            ...state.players.player2,
            playerCards: action.payload[1],
            showCards: true
          }
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
    case "showControls": {
      return {
        ...state,
        controls: {
          ...state.controls,
          showControls: action.payload
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

    case "updateStateValue": {
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    }

    default:
      throw new Error("Action type is required");
  }
};

export default reducer;