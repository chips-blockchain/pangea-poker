const initialState = {
  // Object of all players at the table
  players: {
    player1: {
      isPlaying: false,
      seat: "player1",
      chips: 0,
      hasCards: true,
      showCards: true,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    },
    player2: {
      isPlaying: false,
      seat: "player2",
      chips: 0,
      hasCards: true,
      showCards: true,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    },
    player3: {
      isPlaying: false,
      seat: "player3",
      chips: 0,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    },
    player4: {
      isPlaying: false,
      seat: "player4",
      chips: 0,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    },
    player5: {
      isPlaying: false,
      seat: "player5",
      chips: 0,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    },
    player6: {
      isPlaying: false,
      seat: "player6",
      chips: 0,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    },
    player7: {
      isPlaying: false,
      seat: "player7",
      chips: 0,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    },
    player8: {
      isPlaying: false,
      seat: "player8",
      chips: 0,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    },
    player9: {
      isPlaying: false,
      seat: "player9",
      chips: 0,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 0,
      playerCards: [],
      connected: false
    }
  },
  // Which seat is the active player
  activePlayer: null,
  // Board Cards
  board: {
    flop: [],
    turn: "",
    river: ""
  },
  // Connection status dispalyed at the top
  connection: {
    dcv: "Not connected",
    bvv: "Not connected",
    player1: "Not connected",
    player2: "Not connected"
  },
  controls: {
    showControls: false,
    showFirstRow: true
  },
  // Wether the cards have been dealt
  cardsDealt: false,
  // Which player is the dealer
  dealer: 0,
  // Wether the game has started
  gameStarted: false,
  // Game type at the top left corner
  gameType: "",
  // Cards of the user
  holeCards: [],
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
  message: {
    dcv: null,
    bvv: null,
    player1: null,
    player2: null
  },
  // Options for the pot
  options: {
    showPotCounter: false
  },
  // Pot and side pots
  pot: [0],
  // Number of seats at the table
  seats: 2,
  // Wether to show the dealer button
  showDealer: false,
  // Amount to call
  toCall: 1000000,
  // Amount of the minimum raise
  toRaise: 2000000,
  // Where does the user sit
  userSeat: "player1"
};

export default initialState;
