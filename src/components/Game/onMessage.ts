import {
  bet,
  deal,
  dealCards,
  fold,
  game,
  log,
  nextHand,
  playerJoin,
  seats,
  sendMessage,
  setActivePlayer,
  setBalance,
  setDealer,
  setLastAction,
  setLastMessage,
  setMinRaiseTo,
  setToCall,
  setUserSeat,
  setWinner,
  updateTotalPot,
  showControls,
  setBlinds,
  updateStateValue,
  showDown
} from "../../store/actions";
import playerStringToId from "../../lib/playerStringToId";
import numberWithCommas from "../../lib/numberWithCommas";

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
    case "betting":
      const guiPlayer: number = message["playerid"];
      const betAmount: number = message["bet_amount"];
      const opponent: number = guiPlayer === 0 ? 1 : 0;

      switch (message["action"]) {
        case "small_blind_bet":
          bet(playerId, message["amount"], state, dispatch);
          setLastAction(playerId, "Small Blind", dispatch);
          log("Small Blind has been posted.", "info");

          // Update the opponent's big blind
          bet(opponent, message["amount"] * 2, state, dispatch);
          setLastAction(opponent, "Big Blind", dispatch);
          log("Big Blind has been posted.", "info");
          break;

        case "big_blind_bet":
          // Update the opponent's small blind
          bet(opponent, message["amount"] / 2, state, dispatch);
          setLastAction(opponent, "Small Blind", dispatch);
          log("Small blind has been posted.", "info");

          bet(playerId, message["amount"], state, dispatch);
          setLastAction(playerId, "Big Blind", dispatch);
          log("Big Blind has been posted.", "info");

          break;

        case "round_betting":
          setActivePlayer(player, dispatch);
          updateTotalPot(message["pot"], dispatch);
          setMinRaiseTo(message["minRaiseTo"], dispatch);
          setToCall(message["toCall"], dispatch);
          showControls(true, dispatch);
          break;

        // Update other players actions
        case "check":
          setLastAction(guiPlayer, "check", dispatch);
          break;
        case "call":
          bet(guiPlayer, state.toCall, state, dispatch);
          setLastAction(guiPlayer, "call", dispatch);
          break;
        case "raise":
          bet(guiPlayer, betAmount, state, dispatch);
          setLastAction(guiPlayer, "raise", dispatch);
          break;
        case "fold":
          fold(player, dispatch);
          setLastAction(guiPlayer, "fold", dispatch);
          break;

        case "allin":
          bet(guiPlayer, betAmount, state, dispatch);
          setToCall(betAmount, dispatch);
          setLastAction(guiPlayer, "all-in", dispatch);
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

    case "blindsInfo":
      const blinds: [number, number] = [message.small_blind, message.big_blind];
      setBlinds(blinds, dispatch);
      updateStateValue(
        "gameType",
        `NL Hold'Em | Blinds: ${numberWithCommas(blinds[0])}/${numberWithCommas(
          blinds[1]
        )}`,
        dispatch
      );
      break;

    case "deal":
      dealCards(dispatch);
      setBalance(player, message.deal.balance, dispatch);
      setUserSeat(player, dispatch);
      deal(message, state, dispatch);
      break;

    case "dealer":
      setDealer(message.playerid, dispatch);
      break;

    case "finalInfo":
      setWinner(message.winners[0], message["win_amount"], state, dispatch);
      showDown(message.showInfo.allHoleCardsInfo, dispatch);
      break;

    case "join_req":
      setBalance(player, message.balance, dispatch);
      sendMessage(message, "dcv", state, dispatch);
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

    case "reset":
      setTimeout(() => {
        setUserSeat(null, dispatch);
        nextHand(state, dispatch);
        playerJoin(player, state, dispatch);
      }, 3000);

    case "requestShare":
      if (message["toPlayer"] == 0) {
        message["gui_playerID"] = 0;
        sendMessage(message, "player1", state, dispatch);
      } else if (message["toPlayer"] == 1) {
        message["gui_playerID"] = 1;
        sendMessage(message, "player2", state, dispatch);
      }
      break;

    case "seats":
      seats(message["seats"], dispatch);
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

    default:
      sendMessage(message, "dcv", state, dispatch);
  }
};
