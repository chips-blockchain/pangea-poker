import { IState } from "./initialState";

const initialState: IState = {
  // Object of all players at the table
  players: {
    player1: {
      isPlaying: true,
      seat: "player1",
      chips: 200,
      hasCards: true,
      showCards: true,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    },
    player2: {
      isPlaying: true,
      seat: "player2",
      chips: 200,
      hasCards: true,
      showCards: true,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    }
  },
  // Which seat is the active player
  activePlayer: null,
  // Current blinds - small and big one
  blinds: [0, 0],
  // Board Cards
  boardCards: [],
  // Connection status dispalyed at the top
  connection: {
    dcv: "Not connected",
    bvv: "Not connected",
    player1: "Not connected",
    player2: "Not connected",
    echo: "Not connected"
  },
  controls: {
    canCheck: true,
    canRaise: true,
    showControls: false,
    showFirstRow: true
  },
  // Wether the cards have been dealt
  cardsDealt: false,
  // Wether the chips have been collected to the middle
  chipsCollected: false,
  // Which player is the dealer
  dealer: 0,
  // Wether the game has started
  gameStarted: false,
  // Where are we at the game. 0: preflop, 1: flop, 2: turn, 3: river, 4:
  gameTurn: 0,
  // Game type at the top left corner
  gameType: "",
  // Total number of hands played in this session
  handsPlayed: 0,
  // Log of all palyer actions
  handHistory: [
    {
      action: "A new hand is being dealt.",
      timeStamp: 1574855758300
    },
    {
      action: "The dealer is Player1.",
      timeStamp: 1574855758300
    },
    {
      action: "Player1 posts the Small Blind of 1.",
      timeStamp: 1574855765400
    }
  ],
  // Cards of the user
  holeCards: [],
  // Wether the app should run in developer mode
  isDeveloperMode: true,
  // Whether to show the LogBox component
  isLogBox: true,
  // Wether the Startup Modal shows at the beginning of the game
  isStartupModal: true,
  // Wether players has gone all-in and the showDown is active
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
    bvv: "0.0.0.0",
    player1: "0.0.0.0",
    player2: "0.0.0.0",
    echo: "0.0.0.0"
  },
  message: {
    dcv: null,
    bvv: null,
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
  // Wether to show the dealer button
  showDealer: false,
  // Wether to show the main pot at the center of the table
  showMainPot: true,
  // The calculated value of the pot and all the bets
  totalPot: 0,
  // Amount to call
  toCall: 2,
  // Where does the user sit
  userSeat: "player1",
  // The player that won the game
  winner: null
};

export default initialState;
