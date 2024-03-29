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
  game,
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
  walletInfo,
  backendStatus
} from "../../store/actions";
import log from "../../lib/dev";
import playerStringToId from "../../lib/playerStringToId";
import numberWithCommas from "../../lib/numberWithCommas";
import { IState } from "../../store/initialState";
import playerIdToString from "../../lib/playerIdToString";
import arrayToSentence from "../../lib/arrayToSentence";
import lowerCaseLastLetter from "../../lib/lowerCaseLastLetter";
import sounds from "../../sounds/sounds";
import { GameTurns, Level, BetWarnings } from "../../lib/constants";
import notifications from "../../config/notifications.json";
import { blindBet, isCurrentPlayer } from "./helpers";
export interface IMessage {
  action?: string;
  addr?: string;
  addrs?: string[];
  amount?: number;
  balance?: number;
  backend_status: number;
  bet_amount?: number;
  big_blind?: number;
  table_stack_in_chips: number;
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
    allHoleCardsInfo?: string[][];
    boardCardInfo?: string[];
  };
  small_blind?: number;
  possibilities?: number[];
  toPlayer?: number;
  toCall?: number;
  warning_num: number;
  win_amount?: number;
  winners?: number[];
}

const { preFlop, flop, turn, showDown } = GameTurns;

export const onMessage = (
  messageString: string,
  state: IState,
  dispatch: (arg: object) => void
): void => {
  const message: IMessage = JSON.parse(messageString);
  // keep it just in case for now
  log("Received from DCV", "received", message);
};

export const onMessage_player = (
  messageString: string,
  player: string,
  state: IState,
  dispatch: (arg: object) => void
): void => {
  const message: IMessage = JSON.parse(messageString);
  setLastMessage(message, dispatch);
  log(`${Date.now()}: Received from ${player}: `, "received", message);

  switch (message.method) {
    case "backend_status":
      updateStateValue("backendStatus", message.backend_status, dispatch);
      break;
    case "betting":
      {
        const bePlayerId: number = message.playerid;
        const betAmount: number = message.bet_amount;
        const [smallBlind, bigBlind] = state.blinds;
        switch (message.action) {
          // Update the current player's small blind
          case "small_blind_bet":
            blindBet(
              "Small",
              message.playerid,
              message.amount,
              state,
              dispatch
            );

            // // Update the big blind
            blindBet(
              "Big",
              (message.playerid + 1) % state.maxPlayers,
              message.amount * 2,
              state,
              dispatch
            );

            break;

          case "big_blind_bet":
            // Update the small blind
            blindBet(
              "Small",
              (message.playerid - 1 + state.maxPlayers) % state.maxPlayers,
              message.amount / 2,
              state,
              dispatch
            );

            // Update the current player's big blind
            blindBet("Big", message.playerid, message.amount, state, dispatch);
            break;

          case "round_betting":
            message.player_funds &&
              message.player_funds.forEach((balance: number, index: number) => {
                setBalance(playerIdToString(index), balance, dispatch);
              });

            setActivePlayer(playerIdToString(bePlayerId), dispatch);
            updateTotalPot(message.pot, dispatch);
            setMinRaiseTo(message.minRaiseTo, dispatch);
            setToCall(message.toCall, dispatch);

            // Turn on controls if it's the current player's turn
            if (isCurrentPlayer(bePlayerId, state)) {
              processControls(message.possibilities, dispatch);
              showControls(true, dispatch);
              sounds.alert.play();
            }
            break;

          // Update player actions
          case "check":
            setLastAction(bePlayerId, "check", dispatch);
            addToHandHistory(`Player${bePlayerId + 1} checks.`, dispatch);
            setActivePlayer(null, dispatch);
            sounds.check.play();
            break;
          case "call":
            bet(bePlayerId, betAmount, state, dispatch);
            setLastAction(bePlayerId, "call", dispatch);
            addToHandHistory(`Player${bePlayerId + 1} calls.`, dispatch);
            setActivePlayer(null, dispatch);
            sounds.call.play();
            break;
          case "raise": {
            const isBet = state.toCall === 0;
            const action = isBet ? "bet" : "raise";

            bet(bePlayerId, betAmount, state, dispatch);
            setLastAction(bePlayerId, action, dispatch);
            addToHandHistory(
              `Player${bePlayerId + 1} ${action}s${
                isBet ? "" : " to"
              } ${betAmount}.`,
              dispatch
            );
            setActivePlayer(null, dispatch);
            isBet ? sounds.call.play() : sounds.raise.play();
            break;
          }
          case "fold":
            fold(`player${bePlayerId + 1}`, dispatch);
            setLastAction(bePlayerId, "fold", dispatch);
            addToHandHistory(`Player${bePlayerId + 1} folds.`, dispatch);
            setActivePlayer(null, dispatch);
            sounds.fold.play();
            break;

          case "allin":
            bet(bePlayerId, betAmount, state, dispatch);
            setToCall(betAmount, dispatch);
            setLastAction(bePlayerId, "all-in", dispatch);
            addToHandHistory(
              `Player${bePlayerId + 1} is All-In with ${numberWithCommas(
                betAmount
              )}.`,
              dispatch
            );
            setActivePlayer(null, dispatch);
            sounds.raise.play();
            break;

          default:
            message.gui_playerID = message.playerid;
            sendMessage(message, "player", state, dispatch);
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
      setDealer(message.playerid, dispatch);
      addToHandHistory(`A new hand is being dealt.`, dispatch);
      addToHandHistory(
        `The dealer is Player${message.playerid + 1}.`,
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
        const player = "player" + (message.playerid + 1);
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
        nextHand(state, dispatch);
        playerJoin(player, state, dispatch);
      }, 3000);
      break;

    case "requestShare":
      message.gui_playerID = message.toPlayer;
      sendMessage(message, "player", state, dispatch);
      break;

    case "seats":
      if (!state.depositAddress) {
        walletInfo(state, dispatch);
      }
      // @todo if I receive seats I guess the backend is ready
      updateStateValue("backendStatus", 1, dispatch);
      seats(message.seats, dispatch);
      break;

    case "share_info":
      message.gui_playerID = message.toPlayer;
      sendMessage(message, "player", state, dispatch);
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

    default:
      console.warn(`Received unknown method type "${message.method}" `);
    // Temporarily disabled until status_info will be sorted out in the backend
    // sendMessage(message, "dcv", state, dispatch);
  }
};
