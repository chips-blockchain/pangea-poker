const GameAPI = {};

GameAPI.sendMessage = function(message, node, state, dispatch) {
  if (state.connection[node] === "Connected") {
    dispatch({
      type: "sendMessage",
      payload: {
        node: [node],
        message: JSON.stringify(message)
      }
    });
  } else alert(`Error: ${node} is not connected.`);
};

GameAPI.game = function(gameObject, state, dispatch) {
  if (state.gameStarted === false) {
    dispatch({
      type: "startGame",
      payload: {
        gameType: gameObject.gametype,
        pot: gameObject.pot,
        toCall: gameObject.tocall
      }
    });
  }
};

GameAPI.seats = function(seatsArray, state, dispatch) {
  seatsArray.map(seat => {
    dispatch({
      type: "updateSeats",
      payload: {
        isPlaying: seat.playing === 1 ? true : false,
        player: seat.name,
        chips: seat.stack,
        seat: `player${seat.seat + 1}`
      }
    });
  });
};

GameAPI.playerJoin = function(player, state, dispatch) {
  let id = player.slice(-1) - 1;
  GameAPI.sendMessage(
    { method: "player_join", gui_playerID: id },
    player,
    state,
    dispatch
  );
};

export default GameAPI;
