import { INotice } from "../components/Table/assets/types";

/*eslint-disable @typescript-eslint/camelcase*/

const initialState: IState = {
  // Object of all players at the table
  players: {},
  // Which seat is the active player
  activePlayer: null,
  // The total CHIPS balance the player has in the Pangea Wallet
  balance: 0,
  // 0 - transaction is still being mined
  // 1 - backend is ready
  backendStatus: 0,
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
  connectionStatus: {
    text: "",
    level: 1
  },
  // current chips stack paid to enter the game
  currentChipsStack: 0,
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
  isDeveloperMode: false,
  // Whether to show the LogBox component
  isLogBox: true,
  // Whether the Startup Modal shows at the beginning of the game
  isStartupModal: true,
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
    level: 1
  },
  maxPlayers: 9,
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
  players: {
    player1: IPlayer;
    player2: IPlayer;
    player3: IPlayer;
    player4: IPlayer;
    player5: IPlayer;
    player6: IPlayer;
    player7: IPlayer;
    player8: IPlayer;
    player9: IPlayer;
  };
  activePlayer: string;
  backendStatus: number;
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
  connectionStatus: INotice;
  currentChipsStack: number;
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
  notice: INotice;
  nodes: {
    dcv: string | null;
    player1: string | null;
    player2: string | null;
    echo: string | null;
  };
  nodeType: string;
  maxPlayers: number;
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
