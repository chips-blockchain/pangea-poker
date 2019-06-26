const initialState = {
  // Object of all players at the table
  players: {
    player1: {
      isPlaying: true,
      seat: "player1",
      chips: 783900,
      hasCards: true,
      showCards: false,
      isBetting: false,
      betAmount: 27500,
      playerCards: null
    },
    player2: {
      isPlaying: true,
      seat: "player2",
      chips: 65984,
      hasCards: true,
      showCards: false,
      isBetting: false,
      betAmount: 5249,
      playerCards: null
    },
    player3: {
      isPlaying: false,
      seat: "player3",
      chips: 677854,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 13980,
      playerCards: null
    },
    player4: {
      isPlaying: false,
      seat: "player4",
      chips: 900999,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000,
      playerCards: null
    },
    player5: {
      isPlaying: false,
      seat: "player5",
      chips: 108942,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000000,
      playerCards: null
    },
    player6: {
      isPlaying: false,
      seat: "player6",
      chips: 78400,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000,
      playerCards: null
    },
    player7: {
      isPlaying: false,
      seat: "player7",
      chips: 800800,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000,
      playerCards: null
    },
    player8: {
      isPlaying: false,
      seat: "player8",
      chips: 12000,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000,
      playerCards: null
    },
    player9: {
      isPlaying: false,
      seat: "player9",
      chips: 650000,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000,
      playerCards: null
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
    showSlider: false
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
  // Messages to send to the nodes - when updated, the message will be sent
  message: {
    dcv: null,
    bvv: null,
    player1: null,
    player2: null
  },
  // Options for the pot
  options: {
    showPotCounter: false,
    showPot: false
  },
  // Pot and side pots
  pot: [0],
  // Number of seats at the table
  seats: 2,
  // Wether to show the dealer button
  showDealer: false,
  // Amount to call
  toCall: 0,
  // Where does the user sit
  userSeat: null
};

export default initialState;
