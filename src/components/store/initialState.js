// Object of all players at the table
export const testState = {
  players: {
    player1: {
      isPlaying: true,
      seat: "player1",
      chips: 200000,
      hasCards: true,
      showCards: true,
      isBetting: false,
      betAmount: 0,
      playerCards: ["7h", "7c"],
      connected: true
    },
    player2: {
      isPlaying: true,
      seat: "player2",
      chips: 200000,
      hasCards: true,
      showCards: true,
      isBetting: false,
      betAmount: 0,
      playerCards: ["Ad", "Kd"],
      connected: true
    },
    player3: {
      isPlaying: false,
      seat: "player3",
      chips: 78600035,
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
  activePlayer: "player1",
  // Current blinds - small and big one
  blinds: [1000, 2000],
  // Board Cards
  boardCards: ["As", "5d", "7d", "6d", "6s"],
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
  // Wether the chips have been collected to the middle
  chipsCollected: false,
  // Which player is the dealer
  dealer: 0,
  // Wether the game has started
  gameStarted: false,
  // Where are we at the game. 0: preflop, 1: flop, 2: turn, 3: river
  gameTurn: 0,
  // Game type at the top left corner
  gameType: "",
  // Cards of the user
  holeCards: ["Ad", "Kd"],
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
  // Amount of the minimum raise
  minRaise: 4000,
  // Options for the pot
  options: {
    showPotCounter: true
  },
  // Pot and side pots - dynamicly updated by the TotalPot component
  pot: [0],
  // Number of seats at the table
  seats: 2,
  // Wether to show the dealer button
  showDealer: true,
  // Wether to show to main pot at the center of the table
  showMainPot: false,
  // Amount to call
  toCall: 2000,
  // Where does the user sit
  userSeat: "player3"
};

// export default initialState;
export default testState;
