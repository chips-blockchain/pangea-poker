const initialState = {
  players: {
    player1: {
      isPlaying: true,
      seat: "player1",
      chips: 783900,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 27500
    },
    player2: {
      isPlaying: true,
      seat: "player2",
      chips: 65984,
      hasCards: true,
      showCards: false,
      isBetting: true,
      betAmount: 5249
    },
    player3: {
      isPlaying: true,
      seat: "player3",
      chips: 677854,
      hasCards: true,
      showCards: false,
      isBetting: true,
      betAmount: 13980
    },
    player4: {
      isPlaying: true,
      seat: "player4",
      chips: 900999,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player5: {
      isPlaying: true,
      seat: "player5",
      chips: 108942,
      hasCards: true,
      showCards: true,
      isBetting: false,
      betAmount: 1000000
    },
    player6: {
      isPlaying: true,
      seat: "player6",
      chips: 78400,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player7: {
      isPlaying: true,
      seat: "player7",
      chips: 800800,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player8: {
      isPlaying: true,
      seat: "player8",
      chips: 12000,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player9: {
      isPlaying: true,
      seat: "player9",
      chips: 650000,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    }
  },
  myCards: ["Ac", "Kc"],
  board: {
    flop: ["Kh", "7c", "8c"],
    turn: "Kd",
    river: "8s"
  },
  pot: 27729,
  dealer: "player1",
  activePlayer: "player5",
  connection: {
    dcv: "Not connected",
    bvv: "Not connected",
    player1: "Not connected",
    player2: "Not connected"
  }
};

export default initialState;
