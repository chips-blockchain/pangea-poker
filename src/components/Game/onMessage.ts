/* eslint-disable @typescript-eslint/camelcase */
// Camel case rule is disabled until the backend casing becomes consistent

import {
  addToHandHistory,
  bet,
  collectChips,
  connectPlayer,
  deal,
  dealCards,
  fold,
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
  doShowDown,
  updateGameTurn,
  updateStateValue,
  setBoardCards,
  processControls,
  updateMainPot,
  setNotice,
  clearNotice,
  walletInfo
} from "../../store/actions";
import log from "../../lib/dev";
import numberWithCommas from "../../lib/numberWithCommas";
import { IState } from "../../store/types";
import playerIdToString from "../../lib/playerIdToString";
import arrayToSentence from "../../lib/arrayToSentence";
import lowerCaseLastLetter from "../../lib/lowerCaseLastLetter";
import sounds from "../../sounds/sounds";
import { GameTurns, Level, BetWarnings, Node } from "../../lib/constants";
import notifications from "../../config/notifications.json";
import { blindBet, isCurrentPlayer } from "./helpers";
import { IMessage } from "./types/IMessage";
import { validBEid, getGUIid, getStringId } from "../../lib/playerIdDecoder";

const { preFlop, flop, turn, showDown } = GameTurns;

export const onMessage = (
  message: IMessage,
  nodeName: string,
  state: IState,
  dispatch: (arg: object) => void
): void => {
  if (!message || nodeName !== Node.playerRead) {
    log("Received an unexpected message from " + nodeName, "received", message);
    return;
  }

  setLastMessage(message, dispatch);
  log(`${Date.now()}: Received from ${nodeName}: `, "received", message);

  // Prepare backend ID and GUI id
  if (validBEid(message.playerid)) {
    message.gui_playerID = getGUIid(message.playerid);
    message.beID = message.playerid;
  }

  switch (message.method) {
    case "backend_status":
      updateStateValue("backendStatus", message.backend_status, dispatch);
      walletInfo(state, dispatch);
      break;
    case "betting":
      {
        const betAmount: number = message.bet_amount;
        switch (message.action) {
          // Update the current player's small blind
          case "small_blind_bet":
            blindBet("Small", message.beID, message.amount, state, dispatch);

            // // Update the big blind
            blindBet(
              "Big",
              (message.beID + 1) % state.maxPlayers,
              message.amount * 2,
              state,
              dispatch
            );

            break;

          case "big_blind_bet":
            // Update the small blind
            blindBet(
              "Small",
              (message.beID - 1 + state.maxPlayers) % state.maxPlayers,
              message.amount / 2,
              state,
              dispatch
            );

            // Update the current player's big blind
            blindBet("Big", message.beID, message.amount, state, dispatch);
            break;

          case "round_betting":
            message.player_funds &&
              message.player_funds.forEach((balance: number, index: number) => {
                setBalance(playerIdToString(index), balance, dispatch);
              });

            setActivePlayer(playerIdToString(message.beID), dispatch);
            updateTotalPot(message.pot, dispatch);
            setMinRaiseTo(message.minRaiseTo, dispatch);
            setToCall(message.toCall, dispatch);

            // Turn on controls if it's the current player's turn
            if (isCurrentPlayer(message.beID, state)) {
              processControls(message.possibilities, dispatch);
              showControls(true, dispatch);
              sounds.alert.play();
            }
            break;

          // Update player actions
          case "check":
            setLastAction(message.beID, "check", dispatch);
            addToHandHistory(`Player${message.gui_playerID} checks.`, dispatch);
            setActivePlayer(null, dispatch);
            sounds.check.play();
            break;
          case "call":
            bet(message.beID, betAmount, state, dispatch);
            setLastAction(message.beID, "call", dispatch);
            addToHandHistory(`Player${message.gui_playerID} calls.`, dispatch);
            setActivePlayer(null, dispatch);
            sounds.call.play();
            break;
          case "raise": {
            const isBet = state.toCall === 0;
            const action = isBet ? "bet" : "raise";

            bet(message.beID, betAmount, state, dispatch);
            setLastAction(message.beID, action, dispatch);
            addToHandHistory(
              `Player${message.gui_playerID} ${action}s${
                isBet ? "" : " to"
              } ${betAmount}.`,
              dispatch
            );
            setActivePlayer(null, dispatch);
            isBet ? sounds.call.play() : sounds.raise.play();
            break;
          }
          case "fold":
            fold(`player${message.gui_playerID}`, dispatch);
            setLastAction(message.beID, "fold", dispatch);
            addToHandHistory(`Player${message.gui_playerID} folds.`, dispatch);
            setActivePlayer(null, dispatch);
            sounds.fold.play();
            break;

          case "allin":
            bet(message.beID, betAmount, state, dispatch);
            setToCall(betAmount, dispatch);
            setLastAction(message.beID, "all-in", dispatch);
            addToHandHistory(
              `Player${message.gui_playerID} is All-In with ${numberWithCommas(
                betAmount
              )}.`,
              dispatch
            );
            setActivePlayer(null, dispatch);
            sounds.raise.play();
            break;

          default:
            sendMessage(message, state, dispatch);
            break;
        }
      }
      break;

    case "blindsInfo":
      {
        const blinds: [number, number] = [
          message.small_blind,
          message.big_blind
        ];
        const [smallBlind, bigBlind] = blinds;
        setBlinds(blinds, dispatch);
        updateStateValue(
          "gameType",
          `NL Hold'Em | Blinds: 
          ${numberWithCommas(smallBlind)}
          /
          ${numberWithCommas(bigBlind)}`,
          dispatch
        );
      }
      break;

    case "deal":
      // @todo is userSeat from the state the best reference for the player?
      message.deal.balance &&
        setBalance(state.userSeat, message.deal.balance, dispatch);
      deal(message, state, dispatch);

      !state.cardsDealt && setTimeout(() => dealCards(dispatch), 1500);
      break;

    case "dealer":
      setDealer(message.beID, dispatch);
      addToHandHistory(`A new hand is being dealt.`, dispatch);
      addToHandHistory(
        `The dealer is Player${message.gui_playerID}.`,
        dispatch
      );
      break;

    case "finalInfo": {
      let currentGameTurn = state.gameTurn;
      const boardCardInfo = message.showInfo.boardCardInfo;
      const isShowDown = boardCardInfo.every(x => x !== null);
      const { winners, win_amount } = message;

      // Log winners to hand history
      const logWinners = (): void => {
        // Log if there is a single winner
        if (winners.length === 1) {
          addToHandHistory(
            `Player${winners[0] + 1} wins ${numberWithCommas(win_amount)}.`,
            dispatch
          );
          // Log if the pot is split between multiple players
        } else if (winners.length > 1 && winners.length < 10) {
          const winnerList = arrayToSentence(winners.map(playerIdToString));

          addToHandHistory(
            `The pot is split between ${winnerList}. Each player wins ${numberWithCommas(
              win_amount
            )}.`,
            dispatch
          );
        }
        // Else log an error in the console
        else {
          console.error(
            "Incorrect winner amount has been passed in to the log."
          );
        }
      };

      const handleWinner = (): void => {
        setWinner(message.winners, message.win_amount, state, dispatch);
        logWinners();
        // Update the main pots with a delay, so that in case of a split pot, the numbers displayed are correct
        setTimeout(() => updateMainPot(win_amount, dispatch), 2000);
      };

      // Log board cards when players go All-In
      const logAllInBoardCards = (): void => {
        const [
          firstFlop,
          secondFlop,
          thirdFlop,
          turn,
          river
        ] = boardCardInfo.map(card => lowerCaseLastLetter(card));
        // Flop
        currentGameTurn === 0 &&
          addToHandHistory(
            `The flop is ${firstFlop}, ${secondFlop}, ${thirdFlop}.`,
            dispatch
          );
        // Turn
        currentGameTurn === 1 &&
          addToHandHistory(`The turn is ${turn}.`, dispatch);
        // River
        currentGameTurn === 2 &&
          addToHandHistory(`The river is ${river}.`, dispatch);
      };

      setActivePlayer(null, dispatch);

      if (isShowDown) {
        setBoardCards(boardCardInfo, dispatch);
        collectChips(state, dispatch);
      }

      const playWinnerSelectSound = (): void => {
        setTimeout(() => {
          sounds.winnerSelect.play();
        }, 2000);
      };

      const progressShowDown = (): void => {
        if (currentGameTurn === showDown) {
          handleWinner();
          playWinnerSelectSound();
          return;
        }
        setTimeout(
          () => {
            updateGameTurn(currentGameTurn + 1, dispatch);
            logAllInBoardCards();

            // Play the sounds
            if (currentGameTurn === preFlop) {
              sounds.showFlop.play();
            } else if (currentGameTurn === flop || currentGameTurn === turn) {
              sounds.cardDrop.play();
            }

            currentGameTurn += 1;
            progressShowDown();
          },
          currentGameTurn === preFlop ? 400 : 1500
        );
      };

      if (isShowDown) {
        doShowDown(message.showInfo.allHoleCardsInfo, dispatch);
        progressShowDown();
      } else {
        handleWinner();
        playWinnerSelectSound();
      }
      break;
    }

    case "info":
      if (message.backend_status === 0) {
        console.warn("The backend is preparing the response");
        // @todo will be implemented in https://github.com/chips-blockchain/pangea-poker/issues/272
      }
      if (!message.seat_taken) {
        const player = getStringId(message.gui_playerID);
        // @todo id managements (+/- 1) needs to be centralized
        clearNotice(dispatch);
        setUserSeat(player, dispatch);
        connectPlayer(player, dispatch);
      } else {
        // @todo this will never happen with the current implementation.
        // Will be addressed in https://github.com/chips-blockchain/pangea-poker/issues/272
        setNotice(
          {
            text: notifications.SEAT_TAKEN,
            level: Level.error
          },
          dispatch
        );
      }
      break;

    case "join_req":
      // @todo the conversion to string id should happen in the action
      setBalance(getStringId(message.gui_playerID), message.balance, dispatch);
      sendMessage(message, state, dispatch, Node.dcv);
      break;

    case "playerCardInfo":
      sendMessage(message, state, dispatch, Node.dcv);
      break;

    case "replay":
      message.method = "betting";
      // @todo the conversion to string id should happen in the action
      setActivePlayer(getStringId(message.gui_playerID), dispatch);
      showControls(true, dispatch);
      break;

    case "reset":
      setTimeout(() => {
        nextHand(state, dispatch);
        playerJoin(state.userSeat, state, dispatch);
      }, 3000);
      break;

    case "requestShare":
      message.gui_playerID = message.toPlayer;
      sendMessage(message, state, dispatch);
      break;

    case "seats":
      updateStateValue("backendStatus", 1, dispatch);
      seats(message.seats, dispatch);
      break;

    case "share_info":
      message.gui_playerID = message.toPlayer;
      sendMessage(message, state, dispatch);
      break;

    case "walletInfo":
      updateStateValue("backendStatus", message.backend_status, dispatch);
      updateStateValue("balance", message.balance, dispatch);
      updateStateValue("depositAddress", message.addr, dispatch);
      updateStateValue(
        "currentChipsStack",
        message.table_stack_in_chips,
        dispatch
      );
      updateStateValue("maxPlayers", message.max_players, dispatch);
      break;
    case "warning":
      updateStateValue(
        "backendStatus",
        message.warning_num == BetWarnings.backendNotReady ? 0 : 1,
        dispatch
      );
      break;
    case "withdrawResponse":
      updateStateValue("balance", message.balance, dispatch);
      updateStateValue("withdrawAddressList", message.addrs, dispatch);
      break;

    case "withdrawInfo":
      updateStateValue("latestTransactionId", message.tx, dispatch);
      console.log(message);
      break;

    default:
      console.warn(`Received unknown method type "${message.method}" `);
  }
};
