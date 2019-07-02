import GameAPI from "./GameAPI";

const pangea = {};

pangea.processControls = function(message) {
  console.log(message);

  pangea.controls = message;
  for (var key in message) {
    if (key == "possibilities") pangea.processPossibilities(message[key]);
    else if (key == "min_amount") {
      pangea.game.tocall = message["min_amount"];
      pangea.gui.tocall();
    }
  }
};

pangea.onMessage = function(message, state, dispatch) {
  /*
	var handlers = {'action':pangea.API.action, 'game':pangea.API.game, 'seats':pangea.API.seats, 
	'player':pangea.API.player, 'deal':pangea.API.deal,'chat':pangea.API.chat,'default':pangea.API.default,
	'bvv':pangea.API.bvv, 'dcv':pangea.API.dcv, 'method':pangea.API.method}
	message = JSON.parse(message)
	console.log('Recieved: ', message)
	for (var key in message){
	if (handlers.hasOwnProperty(key)){
	    var handler = handlers[key]
	    handler(message[key])  
	}
	}
	*/
  //pangea.gui.addPlayerControls()
  GameAPI.chat("Received from DCV", "received", JSON.parse(message));
  message = JSON.parse(message);
  if (message["method"] == "game") {
    GameAPI.game(message["game"], state, dispatch);
    GameAPI.sendMessage({ method: "seats" }, "dcv", state, dispatch);
  } else if (message["method"] == "seats") {
    GameAPI.seats(message["seats"], dispatch);
    GameAPI.sendMessage({ method: "dcv" }, "dcv", state, dispatch);
  } else if (message["method"] == "dcv") {
    GameAPI.sendMessage({ method: "bvv" }, "bvv", state, dispatch);
  } else if (message["method"] == "bvv_join") {
    GameAPI.chat("BVV has Joined", "info");
  } else if (message["method"] == "join_res") {
    message["gui_playerID"] = 0;
    GameAPI.sendMessage(message, "player1", state, dispatch);
    message["gui_playerID"] = 1;
    GameAPI.sendMessage(message, "player2", state, dispatch);
  } else if (message["method"] == "check_bvv_ready") {
    GameAPI.sendMessage(message, "bvv", state, dispatch);
  } else if (message["method"] == "init") {
    message["gui_playerID"] = 0;
    GameAPI.sendMessage(message, "player1", state, dispatch);
    message["gui_playerID"] = 1;
    GameAPI.sendMessage(message, "player2", state, dispatch);
  } else if (message["method"] == "init_d") {
    /*
	  Actually this message should be forwarded to players along BVV, since in the backe end the same buffer is getting used and
	  which causing the sync issues, what I'm doing is at this moment I'm just forwading this message to BVV frome from UI and BVV 
	  in the backend forwards this message to Players
	  */
    message["method"] = "init_d_bvv";
    GameAPI.sendMessage(message, "bvv", state, dispatch);

    message["method"] = "init_d_player";
    message["gui_playerID"] = 0;
    GameAPI.sendMessage(message, "player1", state, dispatch);

    message["gui_playerID"] = 1;
    GameAPI.sendMessage(message, "player2", state, dispatch);
  } else if (message["method"] == "dealer") {
    console.log("We got the dealer");

    message["method"] = "dealer_bvv";
    GameAPI.sendMessage(message, "bvv", state, dispatch);

    message["method"] = "dealer_player";
    message["gui_playerID"] = 0;
    GameAPI.sendMessage(message, "player1", state, dispatch);
    message["gui_playerID"] = 1;
    GameAPI.sendMessage(message, "player2", state, dispatch);
    /*
		message["playerID"]=1
		GameAPI.sendMessage(message, "player2", state, dispatch) 
		*/
  } else if (message["method"] == "turn") {
    console.log("Received the turn info");

    if (message["playerid"] == 0) {
      message["gui_playerID"] = 0;
      GameAPI.sendMessage(message, "player1", state, dispatch);
    } else {
      message["gui_playerID"] = 1;
      GameAPI.sendMessage(message, "player2", state, dispatch);
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
          //var push_msg={"method":"push_cards", "playerid":0}
          GameAPI.sendMessage(message, "player1", state, dispatch);
        } else if (message["playerid"] == 1) {
          //var push_msg={"method":"push_cards", "playerid":1}
          GameAPI.sendMessage(message, "player2", state, dispatch);
        }
        //pangea.processControls(message)
      } else {
        if (message["playerid"] == 0) {
          message["gui_playerID"] = 0;
          GameAPI.sendMessage(message, "player1", state, dispatch);
        } else if (message["playerid"] == 1) {
          message["gui_playerID"] = 1;
          GameAPI.sendMessage(message, "player2", state, dispatch);
        }
      }
    } else if (message["action"] == "small_blind_bet") {
      GameAPI.chat("Small Blind has been posted.", "info");
      GameAPI.bet(message["playerid"], message["amount"], state, dispatch);
      GameAPI.setLastAction(
        message["playerid"],
        "Small Blind",
        state,
        dispatch
      );
      message["action"] = "small_blind_bet_player";
      message["gui_playerID"] = 0;
      GameAPI.sendMessage(message, "player1", state, dispatch);

      message["gui_playerID"] = 1;
      GameAPI.sendMessage(message, "player2", state, dispatch);
    } else if (message["action"] == "big_blind_bet") {
      GameAPI.chat("Big Blind has been posted.", "info");
      GameAPI.dealCards(dispatch);
      GameAPI.bet(message["playerid"], message["amount"], state, dispatch);
      GameAPI.setLastAction(message["playerid"], "Big Blind", state, dispatch);
      message["action"] = "big_blind_bet_player";
      message["gui_playerID"] = 0;
      GameAPI.sendMessage(message, "player1", state, dispatch);

      message["gui_playerID"] = 1;
      GameAPI.sendMessage(message, "player2", state, dispatch);
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
        GameAPI.sendMessage(message, "player2", state, dispatch);
      } else if (message["gui_playerID"] == 1) {
        message["gui_playerID"] = 0;
        GameAPI.sendMessage(message, "player1", state, dispatch);
      }
    }
  } else if (message["method"] == "invoice") {
    GameAPI.chat(`pangea.game.pot[0] += message["betAmount"];`, "danger");
    // pangea.game.pot[0] += message["betAmount"];
    GameAPI.chat(`pangea.gui.updatePotAmount();`, "danger");
    // pangea.gui.updatePotAmount();
    if (message["playerID"] == 0) {
      message["gui_playerID"] = 0;
      GameAPI.sendMessage(message, "player1", state, dispatch);
    } else if (message["playerID"] == 1) {
      message["gui_playerID"] = 1;
      GameAPI.sendMessage(message, "player2", state, dispatch);
    }
  } else if (message["method"] == "winningInvoiceRequest") {
    if (message["playerID"] == 0) {
      message["gui_playerID"] = 0;
      GameAPI.sendMessage(message, "player1", state, dispatch);
    } else if (message["playerID"] == 1) {
      message["gui_playerID"] = 1;
      GameAPI.sendMessage(message, "player2", state, dispatch);
    }
  }
};

pangea.onMessage_bvv = function(message, state, dispatch) {
  message = JSON.parse(message);
  GameAPI.chat("Received from BVV: ", "received", message);
  GameAPI.chat(message["method"], "info");
  if (message["method"] == "init_b") {
    /*
    sg777: In the back end this message is forwarded to both the players, this should be changed in the future
    */
    message["method"] = "init_b_player";
    message["gui_playerID"] = 0;
    GameAPI.sendMessage(message, "player1", state, dispatch);

    message["gui_playerID"] = 1;
    GameAPI.sendMessage(message, "player2", state, dispatch);
  } else GameAPI.sendMessage(message, "dcv", state, dispatch);
};

pangea.onMessage_player1 = function(message, state, dispatch) {
  message = JSON.parse(message);
  GameAPI.chat("Received from player1: ", "received", message);

  if (message["method"] == "deal") {
    GameAPI.setUserSeat("player1", dispatch);
    GameAPI.deal(message, state, dispatch);
    // pangea.API.deal(message["deal"]);
  } else if (message["method"] == "requestShare") {
    if (message["toPlayer"] == 1) {
      message["gui_playerID"] = 1;
      GameAPI.sendMessage(message, "player2", state, dispatch);
    }
  } else if (message["method"] == "share_info") {
    if (message["toPlayer"] == 1) {
      message["gui_playerID"] = 1;
      GameAPI.sendMessage(message, "player2", state, dispatch);
    }
  } else if (message["method"] == "playerCardInfo") {
    console.log("playerCardInfo");
    GameAPI.sendMessage(message, "dcv", state, dispatch);
  } else if (
    message["action"] == "check" ||
    message["action"] == "call" ||
    message["action"] == "raise" ||
    message["action"] == "fold" ||
    message["action"] == "allin"
  ) {
    message["gui_playerID"] = 0;
    GameAPI.sendMessage(message, "dcv", state, dispatch);
  } else if (message["method"] == "replay") {
    message["method"] = "betting";
    message["gui_playerID"] = 0;
    GameAPI.setActivePlayer("player1", dispatch);
    GameAPI.chat(`pangea.processControls(message);`, "danger");
    // pangea.processControls(message);
  } else if (message["method"] == "join_req") {
    GameAPI.setBalance("player1", message.balance, dispatch);
    GameAPI.sendMessage(message, "dcv", state, dispatch);
  } else {
    GameAPI.sendMessage(message, "dcv", state, dispatch);
  }
};

pangea.onMessage_player2 = function(message, state, dispatch) {
  message = JSON.parse(message);
  GameAPI.chat("Received from player2: ", "received", message);

  if (message["method"] == "deal") {
    GameAPI.setUserSeat("player2", dispatch);
    GameAPI.deal(message, state, dispatch);
    // pangea.API.deal(message["deal"]);
  } else if (message["method"] == "requestShare") {
    if (message["toPlayer"] == 0) {
      message["gui_playerID"] = 0;
      GameAPI.sendMessage(message, "player1", state, dispatch);
    }
  } else if (message["method"] == "share_info") {
    if (message["toPlayer"] == 0) {
      message["gui_playerID"] = 0;
      GameAPI.sendMessage(message, "player1", state, dispatch);
    }
  } else if (message["method"] == "playerCardInfo") {
    console.log("playerCardInfo");
    GameAPI.sendMessage(message, "dcv", state, dispatch);
  } else if (
    message["action"] == "check" ||
    message["action"] == "call" ||
    message["action"] == "raise" ||
    message["action"] == "fold" ||
    message["action"] == "allin"
  ) {
    message["gui_playerID"] = 1;
    GameAPI.sendMessage(message, "dcv", state, dispatch);
  } else if (message["method"] == "replay") {
    message["method"] = "betting";
    message["gui_playerID"] = 1;
    GameAPI.chat(`pangea.processControls(message);`, "danger");
    GameAPI.setActivePlayer("player2", dispatch);
    // pangea.processControls(message);
  } else if (message["method"] == "join_req") {
    GameAPI.setBalance("player2", message.balance, dispatch);
    GameAPI.sendMessage(message, "dcv", state, dispatch);
  } else {
    GameAPI.sendMessage(message, "dcv", state, dispatch);
  }
};
export default pangea;
