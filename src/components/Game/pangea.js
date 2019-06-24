import GameAPI from "./GameAPI";

const pangea = {};

pangea.processDefault = function(message) {
  message = JSON.parse(message);
  console.log(message);
  for (var key in message) console.log(key, ":", message[key]);
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
  console.log("Received from DCV: ", message);
  message = JSON.parse(message);
  if (message["method"] == "game") {
    GameAPI.game(message["game"], state, dispatch);
    GameAPI.sendMessage("seats", "dcv", state, dispatch);
  } else if (message["method"] == "seats") {
    GameAPI.seats(message["seats"], state, dispatch);
    GameAPI.sendMessage("dcv", "dcv", state, dispatch);
  } else if (message["method"] == "dcv") {
    GameAPI.sendMessage("bvv", "bvv", state, dispatch);
  } else if (message["method"] == "bvv_join") {
    console.log("BVV has Joined");
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
    /*
       message["method"]="init_d_player"  
       message["playerID"]=0
       
       pangea.sendMessage_player1(message)
       message["playerID"]=1
       pangea.sendMessage_player2(message) 
       */
  } else if (message["method"] == "dealer") {
    console.log("We got the dealer");

    message["method"] = "dealer_bvv";
    GameAPI.sendMessage(message, "bvv", state, dispatch);

    message["method"] = "dealer_player";
    GameAPI.sendMessage(message, "player1", state, dispatch);
    /*
      message["playerID"]=1
      pangea.sendMessage_player2(message) 
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
      console.log(message["action"]);
      if (message["playerid"] == 0) {
        message["gui_playerID"] = 0;
        GameAPI.sendMessage("player1", message, state, dispatch);
      } else if (message["playerid"] == 1) {
        message["gui_playerID"] = 1;
        GameAPI.sendMessage("player2", message, state, dispatch);
      }
    } else if (
      message["action"] == "check" ||
      message["action"] == "call" ||
      message["action"] == "raise" ||
      message["action"] == "fold" ||
      message["action"] == "allin"
    ) {
      console.log(message["action"]);
    }
  }
};

pangea.onMessage_bvv = function(message) {
  message = JSON.parse(message);
  console.log("Received from bvv: ", message);
  console.log(message["method"]);
  if (message["method"] == "init_b") {
    /*
      sg777: In the back end this message is forwarded to both the players, this should be changed in the future
      */
    message["method"] = "init_b_player";
    GameAPI.sendMessage("dcv", message, state, dispatch);
    /*
      message["playerID"]=1
      pangea.sendMessage_player2(message)   
      */
    GameAPI.sendMessage("dcv", message, state, dispatch);
  }

  pangea.onMessage_player1 = function(message) {
    message = JSON.parse(message);
    console.log("Received: player1: ", message);
    if (message["method"] == "requestShare") {
      if (message["toPlayer"] == 1) {
        message["gui_playerID"] = 1;
        GameAPI.sendMessage("player2", message, state, dispatch);
      }
    } else if (message["method"] == "share_info") {
      if (message["toPlayer"] == 1) {
        message["gui_playerID"] = 1;
        GameAPI.sendMessage("player2", message, state, dispatch);
      }
    } else if (message["method"] == "playerCardInfo") {
      console.log("playerCardInfo");
      GameAPI.sendMessage("dcv", message, state, dispatch);
    } else if (
      message["action"] == "check" ||
      message["action"] == "call" ||
      message["action"] == "raise" ||
      message["action"] == "fold" ||
      message["action"] == "allin"
    ) {
      message["gui_playerID"] = 0;
      GameAPI.sendMessage("dcv", message, state, dispatch);
    } else {
      GameAPI.sendMessage("dcv", message, state, dispatch);
    }
  };

  pangea.onMessage_player2 = function(message) {
    message = JSON.parse(message);
    console.log("Received: player2: ", message);
    if (message["method"] == "requestShare") {
      if (message["toPlayer"] == 0) {
        message["gui_playerID"] = 0;
        GameAPI.sendMessage("player1", message, state, dispatch);
      }
    } else if (message["method"] == "share_info") {
      if (message["toPlayer"] == 0) {
        message["gui_playerID"] = 0;
        GameAPI.sendMessage("player1", message, state, dispatch);
      }
    } else if (message["method"] == "playerCardInfo") {
      console.log("playerCardInfo");
      GameAPI.sendMessage("dcv", message, state, dispatch);
    } else if (
      message["action"] == "check" ||
      message["action"] == "call" ||
      message["action"] == "raise" ||
      message["action"] == "fold" ||
      message["action"] == "allin"
    ) {
      message["gui_playerID"] = 1;
      GameAPI.sendMessage("dcv", message, state, dispatch);
    } else {
      GameAPI.sendMessage("dcv", message, state, dispatch);
    }
  };
};
export default pangea;
