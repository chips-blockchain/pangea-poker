import {
  addToHandHistory,
  bet,
  collectChips,
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
  showDown,
  updateGameTurn,
  updateStateValue,
  setBoardCards,
  processControls
} from "../../store/actions";
import playerStringToId from "../../lib/playerStringToId";
import numberWithCommas from "../../lib/numberWithCommas";

import { IState } from "../../store/initialState";
import playerIdToString from "../../lib/playerIdToString";
import lowerCaseLastLetter from "../../lib/lowerCaseLastLetter";

export interface IMessage {
  action?: string;
  amount?: number;
  balance?: number;
  bet_amount?: number;
  big_blind?: number;
  deal?: {
    balance?: number;
    board?: string[];
    holecards?: [string, string];
  };
  game?: { gametype: string; pot: number[] };
  gui_playerID?: number;
  method?: string;
  minRaiseTo?: number;
  player_funds?: number[];
  playerid?: number;
  pot?: number;
  seats?: [{ name: string; playing: number; seat: number }];
  showInfo?: {
    allHoleCardsInfo?: string[];
    boardCardInfo?: string[];
  };
  small_blind?: number;
  possibilities?: number[];
  toPlayer?: number;
  toCall?: number;
  win_amount?: number;
  winners?: number[];
}

export const onMessage = (
  messageString: string,
  state: IState,
  dispatch: Function
): void => {
  const message: IMessage = JSON.parse(messageString);

  log("Received from DCV", "received", message);
  setLastMessage(message, dispatch);

  switch (message.method) {
    case "game":
      game(message.game, state, dispatch);
      sendMessage({ method: "seats" }, "dcv", state, dispatch);
      break;

    case "seats":
      seats(message.seats, dispatch);
      break;

    case "bvv_join":
      log("BVV has Joined", "info", undefined);
      break;

    case "check_bvv_ready":
      sendMessage(message, "bvv", state, dispatch);
      break;

    case "init_d":
      message.method = "init_d_bvv";
      sendMessage(message, "bvv", state, dispatch);

      message.method = "init_d_player";
      message.gui_playerID = 0;
      sendMessage(message, "player1", state, dispatch);

      message.gui_playerID = 1;
      sendMessage(message, "player2", state, dispatch);
      break;

    case "turn":
      console.log("Received the turn info");

      if (message.playerid == 0) {
        message.gui_playerID = 0;
        sendMessage(message, "player1", state, dispatch);
      } else {
        message.gui_playerID = 1;
        sendMessage(message, "player2", state, dispatch);
      }
      break;

    case "betting":
      switch (message.action) {
        case "check":
        case "call":
        case "raise":
        case "fold":
        case "allin":
          message.action = message.action + "_player";
          if (message.gui_playerID == 0) {
            message.gui_playerID = 1;
            sendMessage(message, "player2", state, dispatch);
          } else if (message.gui_playerID == 1) {
            message.gui_playerID = 0;
            sendMessage(message, "player1", state, dispatch);
          }
          break;
      }
      break;

    case "invoice":
      switch (message.playerid) {
        case 0:
          message.gui_playerID = 0;
          sendMessage(message, "player1", state, dispatch);
          break;
        case 1:
          message.gui_playerID = 1;
          sendMessage(message, "player2", state, dispatch);
          break;
      }
      break;
    case "blindsInfo":
    /*update small_blind and big_blind values received from backend to the gui here*/
  }
};

export const onMessage_bvv = (
  messageString: string,
  state: IState,
  dispatch: Function
): void => {
  const message: IMessage = JSON.parse(messageString);

  setLastMessage(message, dispatch);
  log("Received from BVV: ", "received", message);
  log(message.method, "info", undefined);

  switch (message.method) {
    case "init_b":
      message.method = "init_b_player";
      message.gui_playerID = 0;
      sendMessage(message, "player1", state, dispatch);

      message.gui_playerID = 1;
      sendMessage(message, "player2", state, dispatch);
      break;

    default:
      sendMessage(message, "dcv", state, dispatch);
  }
};

export const onMessage_player = (
  messageString: string,
  player: string,
  state: IState,
  dispatch: Function
) => {
  const playerId: number = playerStringToId(player);

  const message: IMessage = JSON.parse(messageString);
  setLastMessage(message, dispatch);
  log(`Received from ${player}: `, "received", message);

  switch (message.method) {
    case "betting":
      const guiPlayer: number = message.playerid;
      const betAmount: number = message.bet_amount;
      const opponent: number = guiPlayer === 0 ? 1 : 0;

      switch (message.action) {
        // Update the current player's small blind
        case "small_blind_bet":
          bet(playerId, message.amount, state, dispatch);
          setLastAction(playerId, "Small Blind", dispatch);
          log("Small Blind has been posted.", "info");
          addToHandHistory(
            `Player${guiPlayer + 1} posts the Small Blind of ${
              state.blinds[0]
            }.`,
            dispatch
          );

          // Update the opponent's big blind
          bet(opponent, message.amount * 2, state, dispatch);
          setLastAction(opponent, "Big Blind", dispatch);
          log("Big Blind has been posted.", "info");
          addToHandHistory(
            `Player${opponent + 1} posts the Big Blind of ${state.blinds[1]}.`,
            dispatch
          );
          break;

        case "big_blind_bet":
          // Update the opponent's small blind
          bet(opponent, message.amount / 2, state, dispatch);
          setLastAction(opponent, "Small Blind", dispatch);
          log("Small blind has been posted.", "info");
          addToHandHistory(
            `Player${opponent + 1} posts the Small Blind of ${
              state.blinds[0]
            }.`,
            dispatch
          );

          // Update the current player's big blind
          bet(playerId, message.amount, state, dispatch);
          setLastAction(playerId, "Big Blind", dispatch);
          log("Big Blind has been posted.", "info");
          addToHandHistory(
            `Player${guiPlayer + 1} posts the Big Blind of ${state.blinds[1]}.`,
            dispatch
          );

          break;

        case "round_betting":
          message.player_funds &&
            message.player_funds.forEach((balance: number, index: number) => {
              setBalance(playerIdToString(index), balance, dispatch);
            });

          setActivePlayer(playerIdToString(guiPlayer), dispatch);
          updateTotalPot(message.pot, dispatch);
          setMinRaiseTo(message.minRaiseTo, dispatch);
          setToCall(message.toCall, dispatch);

          // Turn on controls if it's the current player's turn
          if (playerId === guiPlayer) {
            processControls(message.possibilities, dispatch);
            showControls(true, dispatch);
          }
          break;

        // Update other players actions
        case "check":
          setLastAction(guiPlayer, "check", dispatch);
          addToHandHistory(`Player${guiPlayer + 1} checks.`, dispatch);
          break;
        case "call":
          bet(guiPlayer, betAmount, state, dispatch);
          setLastAction(guiPlayer, "call", dispatch);
          addToHandHistory(`Player${guiPlayer + 1} calls.`, dispatch);
          break;
        case "raise":
          bet(guiPlayer, betAmount, state, dispatch);
          setLastAction(guiPlayer, "raise", dispatch);
          addToHandHistory(
            `Player${guiPlayer + 1} raises to ${betAmount}.`,
            dispatch
          );
          break;
        case "fold":
          fold(`player${guiPlayer + 1}`, dispatch);
          setLastAction(guiPlayer, "fold", dispatch);
          addToHandHistory(`Player${guiPlayer + 1} folds.`, dispatch);
          break;

        case "allin":
          bet(guiPlayer, betAmount, state, dispatch);
          setToCall(betAmount, dispatch);
          setLastAction(guiPlayer, "all-in", dispatch);
          addToHandHistory(
            `Player${guiPlayer + 1} is All-In with ${betAmount}.`,
            dispatch
          );
          break;

        default:
          if (message.playerid === 0) {
            message.gui_playerID = 0;
            sendMessage(message, "player1", state, dispatch);
          } else if (message.playerid === 1) {
            message.gui_playerID = 1;
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
      message.deal.balance &&
        setBalance(player, message.deal.balance, dispatch);
      setUserSeat(player, dispatch);
      deal(message, state, dispatch);
      !state.cardsDealt && setTimeout(() => dealCards(dispatch), 1500);
      break;

    case "dealer":
      setDealer(message.playerid, dispatch);
      addToHandHistory(`A new hand is being dealt.`, dispatch);
      addToHandHistory(
        `The dealer is Player${message.playerid + 1}.`,
        dispatch
      );
      break;

    case "finalInfo":
      let currentGameTurn = state.gameTurn;
      const boardCardInfo = message.showInfo.boardCardInfo;
      const isShowDown = boardCardInfo.every(x => x !== null);

      const handleWinner = () => {
        setWinner(message.winners[0], message.win_amount, state, dispatch);
        addToHandHistory(
          `Player${message.winners[0] + 1} wins ${message.win_amount}.`,
          dispatch
        );
      };

      // Log board cards when players go All-In
      const logAllInBoardCards = () => {
        // Flop
        currentGameTurn === 0 &&
          addToHandHistory(
            `The flop is ${lowerCaseLastLetter(
              boardCardInfo[0]
            )}, ${lowerCaseLastLetter(boardCardInfo[1])}, ${lowerCaseLastLetter(
              boardCardInfo[2]
            )}.`,
            dispatch
          );
        // Turn
        currentGameTurn === 1 &&
          addToHandHistory(
            `The turn is ${lowerCaseLastLetter(boardCardInfo[3])}.`,
            dispatch
          );
        // River
        currentGameTurn === 2 &&
          addToHandHistory(
            `The river is ${lowerCaseLastLetter(boardCardInfo[4])}.`,
            dispatch
          );
      };

      setActivePlayer(null, dispatch);
      collectChips(state, dispatch);

      isShowDown && setBoardCards(boardCardInfo, dispatch);

      const progressShowDown = (): void => {
        if (currentGameTurn === 4) {
          handleWinner();
          return;
        }
        setTimeout(
          () => {
            updateGameTurn(currentGameTurn + 1, dispatch);
            logAllInBoardCards();
            currentGameTurn += 1;
            progressShowDown();
          },
          currentGameTurn === 0 ? 400 : 1500
        );
      };

      if (isShowDown) {
        showDown(message.showInfo.allHoleCardsInfo, dispatch);
        updateStateValue("isShowDown", true, dispatch);
        progressShowDown();
      } else {
        handleWinner();
      }

      break;

    case "join_req":
      setBalance(player, message.balance, dispatch);
      sendMessage(message, "dcv", state, dispatch);
      break;

    case "playerCardInfo":
      sendMessage(message, "dcv", state, dispatch);
      break;

    case "replay":
      message.method = "betting";
      message.gui_playerID = playerId;
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
      if (message.toPlayer == 0) {
        message.gui_playerID = 0;
        sendMessage(message, "player1", state, dispatch);
      } else if (message.toPlayer == 1) {
        message.gui_playerID = 1;
        sendMessage(message, "player2", state, dispatch);
      }
      break;

    case "seats":
      seats(message.seats, dispatch);
      break;

    case "share_info":
      if (message.toPlayer == 0) {
        message.gui_playerID = 0;
        sendMessage(message, "player1", state, dispatch);
      } else if (message.toPlayer == 1) {
        message.gui_playerID = 1;
        sendMessage(message, "player2", state, dispatch);
      }
      break;

    default:
      sendMessage(message, "dcv", state, dispatch);
  }
};
