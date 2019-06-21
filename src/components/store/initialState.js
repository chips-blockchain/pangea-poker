const initialState = {
  players: {
    player1: {
      isPlaying: false,
      seat: "player1",
      chips: 783900,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 27500
    },
    player2: {
      isPlaying: false,
      seat: "player2",
      chips: 65984,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 5249
    },
    player3: {
      isPlaying: false,
      seat: "player3",
      chips: 677854,
      hasCards: true,
      showCards: false,
      isBetting: false,
      betAmount: 13980
    },
    player4: {
      isPlaying: false,
      seat: "player4",
      chips: 900999,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player5: {
      isPlaying: false,
      seat: "player5",
      chips: 108942,
      hasCards: true,
      showCards: true,
      isBetting: false,
      betAmount: 1000000
    },
    player6: {
      isPlaying: false,
      seat: "player6",
      chips: 78400,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player7: {
      isPlaying: false,
      seat: "player7",
      chips: 800800,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player8: {
      isPlaying: false,
      seat: "player8",
      chips: 12000,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player9: {
      isPlaying: false,
      seat: "player9",
      chips: 650000,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    }
  },
  myCards: [],
  board: {
    flop: [],
    turn: "",
    river: ""
  },
  pot: [0],
  dealer: "player1",
  activePlayer: "player5",
  connection: {
    dcv: "Not connected",
    bvv: "Not connected",
    player1: "Not connected",
    player2: "Not connected"
  },
  options: {
    showDealer: false,
    showControls: false,
    showPotCounter: false,
    showPot: false
  },
  gameType: "",
  gameStarted: false,
  toCall: 0,
  seats: 0
};

export default initialState;
