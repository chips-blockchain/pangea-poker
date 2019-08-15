import {
  bet,
  deal,
  dealCards,
  game,
  log,
  nextHand,
  playerJoin,
  seats,
  sendMessage,
  setActivePlayer,
  setBalance,
  setLastAction,
  setLastMessage,
  setUserSeat,
  setWinner,
  updateTotalPot,
  showControls,
  setDealer
} from "../../store/actions";
import playerStringToId from "../../lib/playerStringToId";

import { IState } from "../../store/initialState";
import { IMessage } from "../../store/actions";

export const onMessage = (
  message: IMessage,
  state: IState,
  dispatch: Function
): void => {
  message = JSON.parse(message);

  log("Received from DCV", "received", message);
  setLastMessage(message, dispatch);

  switch (message["method"]) {
    case "game":
      game(message["game"], state, dispatch);
      sendMessage({ method: "seats" }, "dcv", state, dispatch);
      break;

    case "seats":
      seats(message["seats"], dispatch);
      break;

    case "bvv_join":
      log("BVV has Joined", "info", undefined);
      break;

    case "check_bvv_ready":
      sendMessage(message, "bvv", state, dispatch);
      break;

    case "init_d":
      message["method"] = "init_d_bvv";
      sendMessage(message, "bvv", state, dispatch);

      message["method"] = "init_d_player";
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);

      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);
      break;

    case "turn":
      console.log("Received the turn info");

      if (message["playerid"] == 0) {
        message["gui_playerID"] = 0;
        sendMessage(message, "player1", state, dispatch);
      } else {
        message["gui_playerID"] = 1;
        sendMessage(message, "player2", state, dispatch);
      }
      break;

    case "betting":
      switch (message["action"]) {
        case "check":
        case "call":
        case "raise":
        case "fold":
        case "allin":
          message["action"] = message["action"] + "_player";
          if (message["gui_playerID"] == 0) {
            message["gui_playerID"] = 1;
            sendMessage(message, "player2", state, dispatch);
          } else if (message["gui_playerID"] == 1) {
            message["gui_playerID"] = 0;
            sendMessage(message, "player1", state, dispatch);
          }
          break;
      }
      break;

    case "invoice":
      switch (message["playerID"]) {
        case 0:
          message["gui_playerID"] = 0;
          sendMessage(message, "player1", state, dispatch);
          break;
        case 1:
          message["gui_playerID"] = 1;
          sendMessage(message, "player2", state, dispatch);
          break;
      }
      break;

    case "winningInvoiceRequest":
      switch (message["playerID"]) {
        case 0:
          message["gui_playerID"] = 0;
          sendMessage(message, "player1", state, dispatch);
          break;
        case 1:
          message["gui_playerID"] = 1;
          sendMessage(message, "player2", state, dispatch);
          break;
      }
      setWinner(message, state, dispatch);
      break;

    case "reset":
      message["method"] = "player_reset";
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);

      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);

      message["method"] = "bvv_reset";
      sendMessage(message, "bvv", state, dispatch);

      setTimeout(() => {
        setUserSeat(null, dispatch);
        nextHand(state, dispatch);
        playerJoin("player1", state, dispatch);
        playerJoin("player2", state, dispatch);
      }, 5000);
      break;
    case "blindsInfo":
    /*update small_blind and big_blind values received from backend to the gui here*/
  }
};

export const onMessage_bvv = (
  message: IMessage,
  state: IState,
  dispatch: Function
): void => {
  message = JSON.parse(message);
  setLastMessage(message, dispatch);
  log("Received from BVV: ", "received", message);
  log(message["method"], "info", undefined);

  switch (message["method"]) {
    case "init_b":
      message["method"] = "init_b_player";
      message["gui_playerID"] = 0;
      sendMessage(message, "player1", state, dispatch);

      message["gui_playerID"] = 1;
      sendMessage(message, "player2", state, dispatch);
      break;

    default:
      sendMessage(message, "dcv", state, dispatch);
  }
};

export const onMessage_player = (
  message: IMessage,
  player: string,
  state: IState,
  dispatch: Function
) => {
  const playerId: number = playerStringToId(player);

  message = JSON.parse(message);
  setLastMessage(message, dispatch);
  log(`Received from ${player}: `, "received", message);

  switch (message["method"]) {
    case "deal":
      dealCards(dispatch);
      setUserSeat(player, dispatch);
      deal(message, state, dispatch);
      break;

    case "dealer":
      setDealer(message.playerid, dispatch);
      break;

    case "requestShare":
      if (message["toPlayer"] == 0) {
        message["gui_playerID"] = 0;
        sendMessage(message, "player1", state, dispatch);
      } else if (message["toPlayer"] == 1) {
        message["gui_playerID"] = 1;
        sendMessage(message, "player2", state, dispatch);
      }
      break;

    case "share_info":
      if (message["toPlayer"] == 0) {
        message["gui_playerID"] = 0;
        sendMessage(message, "player1", state, dispatch);
      } else if (message["toPlayer"] == 1) {
        message["gui_playerID"] = 1;
        sendMessage(message, "player2", state, dispatch);
      }
      break;

    case "playerCardInfo":
      console.log("playerCardInfo");
      sendMessage(message, "dcv", state, dispatch);
      break;

    case "replay":
      message["method"] = "betting";
      message["gui_playerID"] = playerId;
      setActivePlayer(player, dispatch);
      showControls(true, dispatch);
      break;

    case "betting":
      switch (message["action"]) {
        case "small_blind_bet":
          bet(message["playerid"], message["amount"], state, dispatch);
          setLastAction(message["playerid"], "Small Blind", dispatch);
          log("Small Blind has been posted.", "info", undefined);
          break;

        case "big_blind_bet":
          bet(message["playerid"], message["amount"], state, dispatch);
          setLastAction(message["playerid"], "Big Blind", dispatch);
          log("Big Blind has been posted.", "info", undefined);
          break;

        case "round_betting":
          setActivePlayer(player, dispatch);
          updateTotalPot(message["pot"], dispatch);
          showControls(true, dispatch);
          break;

        default:
          if (message["playerid"] === 0) {
            message["gui_playerID"] = 0;
            sendMessage(message, "player1", state, dispatch);
          } else if (message["playerid"] === 1) {
            message["gui_playerID"] = 1;
            sendMessage(message, "player2", state, dispatch);
          }

          break;
      }
      break;

    case "seats":
      seats(message["seats"], dispatch);
      break;

    case "join_req":
      setBalance(player, message.balance, dispatch);
      sendMessage(message, "dcv", state, dispatch);
      break;

    case "blindsInfo":
      /*update small_blind and big_blind values received from backend to the gui here*/
      console.log(message);
      break;

    default:
      switch (message["action"]) {
        /* Here we receive the other players action information*/
        case "check":
        case "call":
        case "raise":
        case "fold":
        case "allin":
          //message["gui_playerID"] = 0;
          //sendMessage(message, "dcv", state, dispatch);
          break;

        default:
          sendMessage(message, "dcv", state, dispatch);
      }
  }
};
