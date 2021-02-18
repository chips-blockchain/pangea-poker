import { IState } from "./types";

/*eslint-disable @typescript-eslint/camelcase*/

const initialState: IState = {
  /********** ME ***********/

  balance: 0, // The total CHIPS balance the player has in the Pangea Wallet
  connectionStatus: {
    level: 1,
    status: null,
    text: ""
  },
  depositAddress: "RMwqv9VNBu7wjrEvQtMrYX7c6ddogyStBG", // Pangea wallet address to deposit to
  holeCards: [], // Cards of the user
  nodeType: null,
  latestTransactionId: null,
  userSeat: null, // Where does the user sit (player1, player2, etc)
  withdrawAddressList: [], // List of addresses where the player can withdraw to. See: https://github.com/chips-blockchain/bet/blob/master/handling_funds.md#withdrawing-the-funds

  /********** BACKEND ***********/
  // 0 - transaction is still being mined
  // 1 - backend is ready
  backendStatus: 0,

  /********** CONTROLS ***********/
  controls: {
    showControls: false,
    showFirstRow: true,
    canCheck: false,
    canRaise: true
  },
  isStartupModal: false, // Whether the Startup Modal shows at the beginning of the game
  isDeveloperMode: false, // Whether the app should run in developer mode
  isCashierOpen: true,
  isLogBox: true,
  isShowDown: false,

  /********** GENERAL GAME INFO ***********/

  activePlayer: null, // Which seat is the active player
  connection: {
    playerRead: null,
    playerWrite: null,
    dcv: null,
    echo: null
  },
  dealer: 0, // Which player is the dealer
  gameStarted: false,
  gameType: "", // Game type at the top left corner
  maxPlayers: 2,
  notice: {
    text: "Choose your seat to begin playing",
    status: null,
    level: 1
  },
  players: {}, // Object of all players at the table
  transactionFee: 0.005,

  /********** POKER INFO ***********/

  blinds: [1, 2], // Current blinds - small and big one
  boardCards: [],
  cardsDealt: false,
  chipsCollected: false, // chips collected to the middle
  currentChipsStack: 0, // current chips stack paid to enter the game
  gameTurn: 0, // Where are we at the game. 0: preflop, 1: flop, 2: turn, 3: river, 4: showDown
  handHistory: [], // Log of all palyer actions
  handsPlayed: 0, // Total number of hands played in this session
  lastAction: { player: 0, action: null }, // Object that stores the last action so we can dispaly it on the UI
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
  nodesSet: false,
  nodes: {
    dcv: "0.0.0.0",
    player1: "0.0.0.0",
    player2: "0.0.0.0",
    echo: "0.0.0.0"
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
  // Array of players that won
  winners: [undefined]
};

export default initialState;
