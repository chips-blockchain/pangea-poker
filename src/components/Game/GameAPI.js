const GameAPI = {};

GameAPI.sendMessage = function(message, node, state, dispatch) {
  if (state.connection[node] === "Connected") {
    dispatch({
      type: "sendMessage",
      payload: {
        node: [node],
        message: JSON.stringify({ method: message })
      }
    });
  } else alert(`Error: ${node} is not connected.`);
};

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
      // Todo: render seats based on this number
    }
  }
};

GameAPI.seats = function(seatsObject, state, dispatch) {
  console.log(seatsObject);
};

export default GameAPI;
