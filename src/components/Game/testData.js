const pTemplate = {
    isPlaying: false,

    chips: 200,
    hasCards: true,
    showCards: true,
    isBetting: false,
    betAmount: 0,
    playerCards: [],
    connected: false
}
export const playersData = {    
    player1: {
        ...pTemplate,
        seat: "player1",
        isPlaying: true,
        connected: true
    },
    player2: {
        ...pTemplate,
        seat: "player2"
    },
    player3: {

        ...pTemplate,
        seat: "player3"
    },
    player4: {

        ...pTemplate,
        seat: "player4"
    },
    player5: {
        ...pTemplate,
        isPlaying: true,
        connected: true,
        seat: "player5"
    },
    player6: {
        ...pTemplate,
        isPlaying: true,
        connected: true,
        seat: "player6"
    },
    player7: {
        ...pTemplate,
        isPlaying: true,
        connected: true,
        seat: "player7"
    },
    player8: {
        ...pTemplate,
        seat: "player8"
    },
    player9: {
        ...pTemplate,
        isPlaying: true,
        connected: true,
        seat: "player9"
    }
  }