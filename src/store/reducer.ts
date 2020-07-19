import { IState, IPlayer } from "./initialState";
import { INotice } from "../components/Table/assets/types";
import { Level } from "../lib/constants";
import { isDev } from "../lib/dev";

interface IPayload extends IState, IPlayer {
  player: string;
  nodeName: string;
  readyState: string;
  payload: string;
  canCheck: IState["controls"]["canCheck"];
  canRaise: IState["controls"]["canRaise"];
  node: IState["nodeType"];
  notice: INotice;
  action: IState["lastAction"]["action"];
  winAmount: number;
  key: string;
  value: string;
}
interface IAction {
  payload: IPayload;
  type: string;
}

const reducer = (state: IState, action: IAction): object => {
  if (isDev) {
    console.log("Reducer", action);
  }
  switch (action.type) {
    case "addToHandHistory": {
      return {
        ...state,
        handHistory: [
          ...state.handHistory,
          { action: action.payload, timeStamp: Date.now() }
        ]
      };
    }
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
    case "connectPlayer": {
      return {
        ...state,
        players: {
          ...state.players,
          [(action.payload as {}) as IPayload["player"]]: {
            ...state.players[(action.payload as {}) as IPayload["player"]],
            connected: true,
            isPlaying: true,
            chips: state.currentChipsStack
          }
        }
      };
    }
    case "dealCards": {
      return {
        ...state,
        cardsDealt: true,
        players: {
          ...state.players,
          player1: {
            ...state.players.player1,
            hasCards: true
          },
          player2: {
            ...state.players.player2,
            hasCards: true
          }
        }
      };
    }
    case "devStart": {
      return {
        ...state,
        boardCards: [],
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
          [(action.payload as {}) as IPayload["player"]]: {
            ...state.players[(action.payload as {}) as IPayload["player"]],
            hasCards: false
          }
        }
      };
    }
    case "processControls": {
      return {
        ...state,
        controls: {
          ...state.controls,
          canCheck: action.payload.canCheck,
          canRaise: action.payload.canRaise
        }
      };
    }
    case "resetTurn": {
      return {
        ...state,
        chipsCollected: false,
        minRaiseTo: action.payload,

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
        holeCards: [],
        isShowDown: false,
        lastAction: { player: 0, action: null },
        minRaiseTo: state.blinds[1] * 2,
        players: {
          ...state.players,
          player1: {
            ...state.players.player1,
            hasCards: true,
            playerCards: []
          },
          player2: {
            ...state.players.player2,
            hasCards: true,
            playerCards: []
          }
        },
        pot: [0],
        toCall: state.blinds[1]
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
    case "setNotice": {
      return {
        ...state,
        notice: action.payload
      };
    }

    case "clearNotice": {
      return {
        ...state,
        notice: {
          text: "",
          level: Level.info
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
      const p = action.payload.player;
      return {
        ...state,
        players: {
          ...state.players,
          [p]: {
            ...state.players[p],
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
    case "setMinRaiseTo": {
      return { ...state, minRaiseTo: action.payload };
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
          [(action.payload as {}) as IPayload["player"]]: {
            ...state.players[(action.payload as {}) as IPayload["player"]],
            showCards: true
          }
        }
      };
    }
    case "setWinner": {
      const playersToUpdate = {};

      // Update each players chips with the win amount
      action.payload.winners.forEach((player: string) => {
        playersToUpdate[player] = {
          ...state.players[player],
          chips: state.players[player].chips + action.payload.winAmount
        };
      });

      return {
        ...state,
        players: {
          ...state.players,
          ...playersToUpdate
        },
        winners: action.payload.winners
      };
    }
    case "doShowDown": {
      return {
        ...state,
        isShowDown: true,
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
            seat: action.payload.seat,
            betAmount: 0,
            chips: action.payload.chips,
            connected: action.payload.connected,
            // hasCards: action.payload.hasCards,
            // showCards: action.payload.showCards,
            // isBetting: action.payload.isBetting
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
