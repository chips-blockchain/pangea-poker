import {
  bet,
  deal,
  dealCards,
  game,
  log,
  seats,
  sendMessage,
  setActivePlayer,
  setBalance,
  setLastAction,
  setLastMessage,
  setUserSeat,
  setWinner,
  toggleControls
} from "./gameAPI";

// The communication structure of this code has been ported from pangea-poker-frontend

export const onMessage = (message, state, dispatch) => {
  log("Received from DCV", "received", JSON.parse(message));
  message = JSON.parse(message);
  setLastMessage(message, dispatch);
  if (message["method"] == "game") {
    game(message["game"], state, dispatch);
    sendMessage({ method: "seats" }, "dcv", state, dispatch);
  } else if (message["method"] == "seats") {
    seats(message["seats"], dispatch);
    sendMessage({ method: "dcv" }, "dcv", state, dispatch);
  } else if (message["method"] == "dcv") {
    sendMessage({ method: "bvv" }, "bvv", state, dispatch);
  } else if (message["method"] == "bvv_join") {
    log("BVV has Joined", "info");
  } else if (message["method"] == "join_res") {
    message["gui_playerID"] = 0;
    sendMessage(message, "player1", state, dispatch);
    message["gui_playerID"] = 1;
    sendMessage(message, "player2", state, dispatch);
  } else if (message["method"] == "check_bvv_ready") {
    sendMessage(message, "bvv", state, dispatch);
  } else if (message["method"] == "init") {
    message["gui_playerID"] = 0;
    sendMessage(message, "player1", state, dispatch);
    message["gui_playerID"] = 1;
    sendMessage(message, "player2", state, dispatch);
  } else if (message["method"] == "init_d") {
    /*
	  Actually this message should be forwarded to players along BVV, since in the backe end the same buffer is getting used and
	  which causing the sync issues, what I'm doing is at this moment I'm just forwading this message to BVV frome from UI and BVV 
	  in the backend forwards this message to Players
	  */
    message["method"] = "init_d_bvv";
    sendMessage(message, "bvv", state, dispatch);

    message["method"] = "init_d_player";
    message["gui_playerID"] = 0;
    sendMessage(message, "player1", state, dispatch);

    message["gui_playerID"] = 1;
    sendMessage(message, "player2", state, dispatch);
  } else if (message["method"] == "dealer") {
    console.log("We got the dealer");

    message["method"] = "dealer_bvv";
    sendMessage(message, "bvv", state, dispatch);

    message["method"] = "dealer_player";
    message["gui_playerID"] = 0;
    sendMessage(message, "player1", state, dispatch);
    message["gui_playerID"] = 1;
    sendMessage(message, "player2", state, dispatch);
  } else if (message["method"] == "turn") {
    console.log("Received the turn info");

    if (message["playerid"] == 0) {
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);
    } else {
      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);
    }
  } else if (message["method"] == "betting") {
    if (
      message["action"] == "small_blind" ||
      message["action"] == "big_blind" ||
      message["action"] == "round_betting"
    ) {
      if (message["action"] == "round_betting") {
        message["method"] = "replay";

        if (message["playerid"] == 0) {
          sendMessage(message, "player1", state, dispatch);
        } else if (message["playerid"] == 1) {
          sendMessage(message, "player2", state, dispatch);
        }
      } else {
        if (message["playerid"] == 0) {
          message["gui_playerID"] = 0;
          sendMessage(message, "player1", state, dispatch);
        } else if (message["playerid"] == 1) {
          message["gui_playerID"] = 1;
          sendMessage(message, "player2", state, dispatch);
        }
      }
    } else if (message["action"] == "small_blind_bet") {
      log("Small Blind has been posted.", "info");
      bet(message["playerid"], message["amount"], state, dispatch);
      setLastAction(message["playerid"], "Small Blind", dispatch);
      message["action"] = "small_blind_bet_player";
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);

      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);
    } else if (message["action"] == "big_blind_bet") {
      log("Big Blind has been posted.", "info");
      dealCards(dispatch);
      bet(message["playerid"], message["amount"], state, dispatch);
      setLastAction(message["playerid"], "Big Blind", dispatch);
      message["action"] = "big_blind_bet_player";
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);

      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);
    } else if (
      message["action"] == "check" ||
      message["action"] == "call" ||
      message["action"] == "raise" ||
      message["action"] == "fold" ||
      message["action"] == "allin"
    ) {
      message["action"] = message["action"] + "_player";
      if (message["gui_playerID"] == 0) {
        message["gui_playerID"] = 1;
        sendMessage(message, "player2", state, dispatch);
      } else if (message["gui_playerID"] == 1) {
        message["gui_playerID"] = 0;
        sendMessage(message, "player1", state, dispatch);
      }
    }
  } else if (message["method"] == "invoice") {
    log(`pangea.game.pot[0] += message["betAmount"];`, "danger");
    log(`pangea.gui.updatePotAmount();`, "danger");

    if (message["playerID"] == 0) {
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);
    } else if (message["playerID"] == 1) {
      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);
    }
  } else if (message["method"] == "winningInvoiceRequest") {
    if (message["playerID"] == 0) {
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);
    } else if (message["playerID"] == 1) {
      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);
    }
    setWinner(message, dispatch);
  }
};

export const onMessage_bvv = (message, state, dispatch) => {
  message = JSON.parse(message);
  setLastMessage(message, dispatch);
  log("Received from BVV: ", "received", message);
  log(message["method"], "info");
  if (message["method"] == "init_b") {
    /*
    sg777: In the back end this message is forwarded to both the players, this should be changed in the future
    */
    message["method"] = "init_b_player";
    message["gui_playerID"] = 0;
    sendMessage(message, "player1", state, dispatch);

    message["gui_playerID"] = 1;
    sendMessage(message, "player2", state, dispatch);
  } else {
    sendMessage(message, "dcv", state, dispatch);
  }
};
export const onMessage_player1 = (message, state, dispatch) => {
  message = JSON.parse(message);
  setLastMessage(message, dispatch);
  log("Received from player1: ", "received", message);

  if (message["method"] == "deal") {
    setUserSeat("player1", dispatch);
    deal(message, state, dispatch);
  } else if (message["method"] == "requestShare") {
    if (message["toPlayer"] == 1) {
      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);
    }
  } else if (message["method"] == "share_info") {
    if (message["toPlayer"] == 1) {
      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);
    }
  } else if (message["method"] == "playerCardInfo") {
    console.log("playerCardInfo");
    sendMessage(message, "dcv", state, dispatch);
  } else if (
    message["action"] == "check" ||
    message["action"] == "call" ||
    message["action"] == "raise" ||
    message["action"] == "fold" ||
    message["action"] == "allin"
  ) {
    message["gui_playerID"] = 0;
    sendMessage(message, "dcv", state, dispatch);
  } else if (message["method"] == "replay") {
    message["method"] = "betting";
    message["gui_playerID"] = 0;
    setActivePlayer("player1", dispatch);
    toggleControls(dispatch);
  } else if (message["method"] == "join_req") {
    setBalance("player1", message.balance, dispatch);
    sendMessage(message, "dcv", state, dispatch);
  } else {
    sendMessage(message, "dcv", state, dispatch);
  }
};

export const onMessage_player2 = (message, state, dispatch) => {
  message = JSON.parse(message);
  setLastMessage(message, dispatch);
  log("Received from player2: ", "received", message);

  if (message["method"] == "deal") {
    setUserSeat("player2", dispatch);
    deal(message, state, dispatch);
  } else if (message["method"] == "requestShare") {
    if (message["toPlayer"] == 0) {
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);
    }
  } else if (message["method"] == "share_info") {
    if (message["toPlayer"] == 0) {
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);
    }
  } else if (message["method"] == "playerCardInfo") {
    console.log("playerCardInfo");
    sendMessage(message, "dcv", state, dispatch);
  } else if (
    message["action"] == "check" ||
    message["action"] == "call" ||
    message["action"] == "raise" ||
    message["action"] == "fold" ||
    message["action"] == "allin"
  ) {
    message["gui_playerID"] = 1;
    sendMessage(message, "dcv", state, dispatch);
  } else if (message["method"] == "replay") {
    message["method"] = "betting";
    message["gui_playerID"] = 1;
    setActivePlayer("player2", dispatch);
    toggleControls(dispatch);
  } else if (message["method"] == "join_req") {
    setBalance("player2", message.balance, dispatch);
    sendMessage(message, "dcv", state, dispatch);
  } else {
    sendMessage(message, "dcv", state, dispatch);
  }
};
