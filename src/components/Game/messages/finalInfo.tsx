import arrayToSentence from "../../../lib/arrayToSentence";
import { GameTurns } from "../../../lib/constants";
import lowerCaseLastLetter from "../../../lib/lowerCaseLastLetter";
import numberWithCommas from "../../../lib/numberWithCommas";
import playerIdToString from "../../../lib/playerIdToString";
import sounds from "../../../sounds/sounds";
import {
  addToHandHistory,
  collectChips,
  doShowDown,
  sendMessage,
  setActivePlayer,
  setBoardCards,
  setWinner,
  updateGameTurn,
  updateMainPot
} from "../../../store/actions";
import { gameOptions } from "../../../lib/constants";
const { preFlop, flop, turn, showDown } = GameTurns;

function sendGameOptions(state, dispatch) {
  sendMessage(
    {
      method: "sitout",
      value: Number(state.gameOptions.chosenOption === gameOptions.SIT_OUT)
    },
    state,
    dispatch
  );
}

// Log winners to hand history
const logWinners = (message, dispatch): void => {
  // Log if there is a single winner
  if (message.winners.length === 1) {
    addToHandHistory(
      `Player${message.winners[0] + 1} wins ${numberWithCommas(
        message.win_amount
      )}.`,
      dispatch
    );
    // Log if the pot is split between multiple players
  } else if (message.winners.length > 1 && message.winners.length < 10) {
    const winnerList = arrayToSentence(message.winners.map(playerIdToString));

    addToHandHistory(
      `The pot is split between ${winnerList}. Each player wins ${numberWithCommas(
        message.win_amount
      )}.`,
      dispatch
    );
  }
  // Else log an error in the console
  else {
    console.error("Incorrect winner amount has been passed in to the log.");
  }
};

const handleWinner = (message, dispatch, state): void => {
  setWinner(message.winners, message.win_amount, state, dispatch);
  logWinners(message, dispatch);
  // Update the main pots with a delay, so that in case of a split pot, the numbers displayed are correct
  setTimeout(() => updateMainPot(message.win_amount, dispatch), 2000);
};

// Log board cards when players go All-In
const logAllInBoardCards = (currentGameTurn, message, dispatch): void => {
  const boardCardInfo = message.showInfo.boardCardInfo;
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
  currentGameTurn === 1 && addToHandHistory(`The turn is ${turn}.`, dispatch);
  // River
  currentGameTurn === 2 && addToHandHistory(`The river is ${river}.`, dispatch);
};

const playWinnerSelectSound = (): void => {
  setTimeout(() => {
    sounds.winnerSelect.play();
  }, 2000);
};

const progressShowDown = (currentGameTurn, state, dispatch, message): void => {
  if (currentGameTurn === showDown) {
    handleWinner(message, dispatch, state);
    playWinnerSelectSound();
    sendGameOptions(state, dispatch);
    return;
  }
  setTimeout(
    () => {
      updateGameTurn(currentGameTurn + 1, dispatch);
      logAllInBoardCards(currentGameTurn, message, dispatch);

      // Play the sounds
      if (currentGameTurn === preFlop) {
        sounds.showFlop.play();
      } else if (currentGameTurn === flop || currentGameTurn === turn) {
        sounds.cardDrop.play();
      }

      currentGameTurn += 1;
      progressShowDown(currentGameTurn, state, dispatch, message);
    },
    currentGameTurn === preFlop ? 400 : 1500
  );
};

const finalInfoMessage = (message, dispatch, state) => {
  const currentGameTurn = state.gameTurn;
  const boardCardInfo = message.showInfo.boardCardInfo;
  const isShowDown = boardCardInfo.every(x => x !== null);

  setActivePlayer(null, dispatch);

  if (isShowDown) {
    setBoardCards(boardCardInfo, dispatch);
    collectChips(state, dispatch);
    doShowDown(message.showInfo.allHoleCardsInfo, dispatch);
    progressShowDown(currentGameTurn, state, dispatch, message);
  } else {
    handleWinner(message, dispatch, state);
    sendGameOptions(state, dispatch);
    playWinnerSelectSound();
  }
};

export default finalInfoMessage;
