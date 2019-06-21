const GameAPI = {};

GameAPI.sendMessage = function(message, node) {};

GameAPI.game = function(gameObject, state, dispatch) {
  console.log(gameObject);
  if (state.gameStarted === false) {
    dispatch({
      type: "startGame",
      payload: {
        gameType: gameObject.gametype,
        pot: gameObject.pot,
        toCall: gameObject.tocall
      }
    });
    for (let i = 0; i < gameObject.seats; i++) {
      dispatch({
        type: "startGame",
        payload: {
          gameType: gameObject.gametype,
          pot: gameObject.pot,
          toCall: gameObject.tocall
        }
      });
    }
  }
};

export default GameAPI;
