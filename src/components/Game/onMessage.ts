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
  doShowDown,
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
import sounds from "../../sounds/sounds";
import { GameTurns } from "../../lib/constants";
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

const { preFlop, flop, turn, showDown } = GameTurns;

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

    case "check_bvv_ready":
      sendMessage(message, "bvv", state, dispatch);
      break;

    case "turn":
      console.log("Received the turn info");

      if (message.playerid == 0) {
        message.gui_playerID = 0; //eslint-disable-line @typescript-eslint/camelcase
        sendMessage(message, "player1", state, dispatch);
      } else {
        message.gui_playerID = 1; //eslint-disable-line @typescript-eslint/camelcase
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
            message.gui_playerID = 1; //eslint-disable-line @typescript-eslint/camelcase
            sendMessage(message, "player2", state, dispatch);
          } else if (message.gui_playerID == 1) {
            message.gui_playerID = 0; //eslint-disable-line @typescript-eslint/camelcase
            sendMessage(message, "player1", state, dispatch);
          }
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
      message.gui_playerID = 0; //eslint-disable-line @typescript-eslint/camelcase
      sendMessage(message, "player1", state, dispatch);

      message.gui_playerID = 1; //eslint-disable-line @typescript-eslint/camelcase
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
): void => {
  const playerId: number = playerStringToId(player);

  const message: IMessage = JSON.parse(messageString);
  setLastMessage(message, dispatch);
  log(`Received from ${player}: `, "received", message);

  switch (message.method) {
    case "betting":
      {
        const guiPlayer: number = message.playerid;
        const betAmount: number = message.bet_amount;
        const opponent: number = guiPlayer === 0 ? 1 : 0;
        const [smallBlind, bigBlind] = state.blinds;

        switch (message.action) {
          // Update the current player's small blind
          case "small_blind_bet":
            bet(playerId, message.amount, state, dispatch);
            setLastAction(playerId, "Small Blind", dispatch);
            log("Small Blind has been posted.", "info");
            addToHandHistory(
              `Player${guiPlayer + 1} posts the Small Blind of ${smallBlind}.`,
              dispatch
            );

            // Update the opponent's big blind
            bet(opponent, message.amount * 2, state, dispatch);
            setLastAction(opponent, "Big Blind", dispatch);
            log("Big Blind has been posted.", "info");
            addToHandHistory(
              `Player${opponent + 1} posts the Big Blind of ${bigBlind}.`,
              dispatch
            );
            break;

          case "big_blind_bet":
            // Update the opponent's small blind
            bet(opponent, message.amount / 2, state, dispatch);
            setLastAction(opponent, "Small Blind", dispatch);
            log("Small blind has been posted.", "info");
            addToHandHistory(
              `Player${opponent + 1} posts the Small Blind of ${smallBlind}.`,
              dispatch
            );

            // Update the current player's big blind
            bet(playerId, message.amount, state, dispatch);
            setLastAction(playerId, "Big Blind", dispatch);
            log("Big Blind has been posted.", "info");
            addToHandHistory(
              `Player${guiPlayer + 1} posts the Big Blind of ${bigBlind}.`,
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
              sounds.alert.play();
            }
            break;

          // Update player actions
          case "check":
            setLastAction(guiPlayer, "check", dispatch);
            addToHandHistory(`Player${guiPlayer + 1} checks.`, dispatch);
            setActivePlayer(null, dispatch);
            sounds.check.play();
            break;
          case "call":
            bet(guiPlayer, betAmount, state, dispatch);
            setLastAction(guiPlayer, "call", dispatch);
            addToHandHistory(`Player${guiPlayer + 1} calls.`, dispatch);
            setActivePlayer(null, dispatch);
            sounds.call.play();
            break;
          case "raise": {
            const isBet = state.toCall === 0;
            const action = isBet ? "bet" : "raise";

            bet(guiPlayer, betAmount, state, dispatch);
            setLastAction(guiPlayer, action, dispatch);
            addToHandHistory(
              `Player${guiPlayer + 1} ${action}s${
                isBet ? "" : " to"
              } ${betAmount}.`,
              dispatch
            );
            setActivePlayer(null, dispatch);
            isBet ? sounds.call.play() : sounds.raise.play();
            break;
          }
          case "fold":
            fold(`player${guiPlayer + 1}`, dispatch);
            setLastAction(guiPlayer, "fold", dispatch);
            addToHandHistory(`Player${guiPlayer + 1} folds.`, dispatch);
            setActivePlayer(null, dispatch);
            sounds.fold.play();
            break;

          case "allin":
            bet(guiPlayer, betAmount, state, dispatch);
            setToCall(betAmount, dispatch);
            setLastAction(guiPlayer, "all-in", dispatch);
            addToHandHistory(
              `Player${guiPlayer + 1} is All-In with ${betAmount}.`,
              dispatch
            );
            setActivePlayer(null, dispatch);
            sounds.raise.play();
            break;

          default:
            if (message.playerid === 0) {
              message.gui_playerID = 0; //eslint-disable-line @typescript-eslint/camelcase
              sendMessage(message, "player1", state, dispatch);
            } else if (message.playerid === 1) {
              message.gui_playerID = 1; //eslint-disable-line @typescript-eslint/camelcase
              sendMessage(message, "player2", state, dispatch);
            }

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
          `NL Hold'Em | Blinds: ${numberWithCommas(
            smallBlind
          )}/${numberWithCommas(bigBlind)}`,
          dispatch
        );
      }
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

    case "finalInfo": {
      let currentGameTurn = state.gameTurn;
      const boardCardInfo = message.showInfo.boardCardInfo;
      const isShowDown = boardCardInfo.every(x => x !== null);

      const handleWinner = (): void => {
        setWinner(message.winners, message.win_amount, state, dispatch);
        addToHandHistory(
          // TODO: Fix the log
          `Player${message.winners[0] + 1} wins ${message.win_amount}.`,
          dispatch
        );
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

    case "join_req":
      setBalance(player, message.balance, dispatch);
      sendMessage(message, "dcv", state, dispatch);
      break;

    case "playerCardInfo":
      sendMessage(message, "dcv", state, dispatch);
      break;

    case "replay":
      message.method = "betting";
      message.gui_playerID = playerId; //eslint-disable-line @typescript-eslint/camelcase
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
      if (message.toPlayer == 0) {
        message.gui_playerID = 0; //eslint-disable-line @typescript-eslint/camelcase
        sendMessage(message, "player1", state, dispatch);
      } else if (message.toPlayer == 1) {
        message.gui_playerID = 1; //eslint-disable-line @typescript-eslint/camelcase
        sendMessage(message, "player2", state, dispatch);
      }
      break;

    case "seats":
      seats(message.seats, dispatch);
      break;

    case "share_info":
      if (message.toPlayer == 0) {
        message.gui_playerID = 0; //eslint-disable-line @typescript-eslint/camelcase
        sendMessage(message, "player1", state, dispatch);
      } else if (message.toPlayer == 1) {
        message.gui_playerID = 1; //eslint-disable-line @typescript-eslint/camelcase
        sendMessage(message, "player2", state, dispatch);
      }
      break;

    default:
      sendMessage(message, "dcv", state, dispatch);
  }
};
