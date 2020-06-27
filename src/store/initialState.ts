import { INotice } from "../components/Table/assets/types";

/*eslint-disable @typescript-eslint/camelcase*/
const defaultPlayer = {
  isPlaying: false,
  chips: 200,
  hasCards: false,
  showCards: false,
  isBetting: false,
  betAmount: 0,
  playerCards: [],
  connected: false
}

let local = {}
try {
  local = require('../config/local.json');
} catch (e) {
  console.warn('CHIPS WARNING: You are missing a local configuration file. Check README for more details.')
}

const initialState: IState = {
  // Object of all players at the table
  players: {
    player1: {
      ...defaultPlayer,
      seat: "player1"
    },
    player2: {
      ...defaultPlayer,
      seat: "player2"
    },
    player3: {
      ...defaultPlayer,
      seat: "player3"
    },
    player4: {
      ...defaultPlayer,
      seat: "player4"
    },
    player5: {
      ...defaultPlayer,
      seat: "player5"
    },
    player6: {
      ...defaultPlayer,
      seat: "player6"
    },
    player7: {
      ...defaultPlayer,
      seat: "player7"
    },
    player8: {
      ...defaultPlayer,
      seat: "player8"
    },
    player9: {
      ...defaultPlayer,
      seat: "player9"
    }
  },
  // Which seat is the active player
  activePlayer: null,
  // The total CHIPS balance the player has in the Pangea Wallet
  balance: 0,
  // Current blinds - small and big one
  blinds: [1, 2],
  // Board Cards
  boardCards: [],
  // Connection status dispalyed at the top
  connection: {
    dcv: "Not connected",
    player1: "Not connected",
    player2: "Not connected",
    echo: "Not connected"
  },
  controls: {
    showControls: false,
    showFirstRow: true,
    canCheck: false,
    canRaise: true
  },
  // Whether the cards have been dealt
  cardsDealt: false,
  // Whether the chips have been collected to the middle
  chipsCollected: false,
  // Which player is the dealer
  dealer: 0,
  // Pangea wallet address to deposit to
  depositAddress: undefined,
  // Whether the game has started
  gameStarted: false,
  // Where are we at the game. 0: preflop, 1: flop, 2: turn, 3: river, 4: showDown
  gameTurn: 0,
  // Game type at the top left corner
  gameType: "",
  // Log of all palyer actions
  handHistory: [],
  // Total number of hands played in this session
  handsPlayed: 0,
  // Cards of the user
  holeCards: [],
  // Whehter the Cashier is open
  isCashierOpen: false,
  // Whether the app should run in developer mode
  isDeveloperMode: "isDeveloperMode" in local ? local.isDeveloperMode : false,
  // Whether to show the LogBox component
  isLogBox: true,
  // Whether the Startup Modal shows at the beginning of the game
  isStartupModal: "isStartupModal" in local ? local.isStartupModal : true,
  // Whether players has gone all-in and the showDown is active
  isShowDown: false,
  // Object that stores the last action so we can dispaly it on the UI
  lastAction: { player: 0, action: null },
  // Messages to send to the nodes - when updated, the message will be sent
  lastMessage: {
    method: "replay",
    action: "round_betting",
    playerid: 1,
    round: 1,
    pot: 4000000,
    actions: [5, 3, 3],
    possibilities: [0, 1, 2, 3, 4, 5, 6, 7],
    min_amount: 0,
    gui_playerID: 1
  },
  nodeType: null,
  nodes: {
    dcv: "0.0.0.0",
    player1: "0.0.0.0",
    player2: "0.0.0.0",
    echo: "0.0.0.0"
  },
  notice: {
    text: "Choose your seat to begin playing",
    error: false
  },
  message: {
    dcv: null,
    player1: null,
    player2: null,
    echo: null
  },
  // Amount of the minimum raise
  minRaiseTo: 4,
  // Options for the pot
  options: {
    showPotCounter: false
  },
  // Pot and side pots - dynamicly updated by the TotalPot component
  pot: [0],
  // Number of seats at the table
  seats: 2,
  // Whether to show the dealer button
  showDealer: false,
  // Whether to show the main pot at the center of the table
  showMainPot: true,
  // The calculated value of the pot and all the bets
  totalPot: 0,
  // Amount to call
  toCall: 2,
  // Where does the user sit
  userSeat: null,
  // Array of players that won
  winners: [undefined],
  // List of addresses where the player can withdraw to. See: https://github.com/chips-blockchain/bet/blob/master/handling_funds.md#withdrawing-the-funds
  withdrawAddressList: []
};

export interface IPlayer {
  isPlaying: boolean;
  seat: string;
  chips: number;
  hasCards: boolean;
  showCards: boolean;
  isBetting: boolean;
  betAmount: number;
  playerCards: string[];
  connected: boolean;
}

export interface IState {
  players: { player1: IPlayer; player2: IPlayer, player3: IPlayer, player4: IPlayer, player5: IPlayer, player6: IPlayer ,player7: IPlayer,player8: IPlayer, player9: IPlayer };
  activePlayer: string;
  balance: number;
  blinds: [number, number];
  boardCards: string[];
  connection: {
    dcv: string;
    player1: string;
    player2: string;
    echo: string;
  };
  controls: {
    canCheck: boolean;
    canRaise: boolean;
    showControls: boolean;
    showFirstRow: boolean;
  };
  cardsDealt: boolean;
  chipsCollected: boolean;
  dealer: number;
  depositAddress: string;
  gameStarted: boolean;
  gameTurn: 0 | 1 | 2 | 3 | 4;
  gameType: string;
  handHistory: { action: string; timeStamp: number }[];
  handsPlayed: number;
  holeCards: string[];
  isCashierOpen: boolean;
  isDeveloperMode: boolean;
  isLogBox: boolean;
  isShowDown: boolean;
  isStartupModal: boolean;
  lastAction: { player: number; action: string | null };
  lastMessage: object;
  notice: INotice,
  nodes: {
    dcv: string | null;
    player1: string | null;
    player2: string | null;
    echo: string | null;
  };
  nodeType: string;
  message: {
    dcv: string | null;
    player1: string | null;
    player2: string | null;
    echo: string | null;
  };
  minRaiseTo: number;
  options: {
    showPotCounter: boolean;
  };
  pot: number[];
  seats: number;
  showDealer: boolean;
  showMainPot: boolean;
  totalPot: number;
  toCall: number;
  userSeat: string;
  winners: string[] | null;
  withdrawAddressList: string[];
}

export default initialState;
