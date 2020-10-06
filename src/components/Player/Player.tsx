import { css } from "@emotion/core";
import React, { useState, useEffect, useContext } from "react";
import Card from "../Card";
import { CardFaceDown } from "../Card";
import randomEmoji from "../../lib/randomEmoji";
import numberWithCommas from "../../lib/numberWithCommas";
import { DispatchContext, StateContext } from "../../store/context";
import {
  playerJoin,
  showControls,
  setLastAction,
  sendMessage,
  setActivePlayer
} from "../../store/actions";
import playerIdToString from "../../lib/playerIdToString";
import playerStringToId from "../../lib/playerStringToId";
import { IPlayer, IState } from "../../store/types";
import { IMessage } from "../Game/onMessage";
import { Possibilities, PlayerActions, GameTurns, Node } from "../../lib/constants";
import notifications from "../../config/notifications.json";
import sounds from "../../sounds/sounds";
import {
  Balance,
  CardsWrapper,
  faceDownCards,
  PlayerEmoji,
  playerWidget,
  PlayerName,
  PlayerInfo,
  PlayerTimerBar,
  PlayerHighlight,
  PlayerNameWrapper
} from "./assets/style";

// This is the Player widget that shows the player avatar, the chips amount, wether the player has cards, etc

interface IProps extends IPlayer {
  chips: number;
  connected: boolean;
  isActive: boolean;
}

const { showDown } = GameTurns;

const Player: React.FunctionComponent<IProps> = ({
  chips,
  connected,
  hasCards,
  isActive,
  playerCards,
  seat,
  showCards
}) => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);

  const {
    activePlayer,
    cardsDealt,
    controls,
    gameTurn,
    holeCards,
    isShowDown,
    lastAction,
    lastMessage,
    seats,
    userSeat
  } = state;

  const [seatMessage, setSeatMessage] = useState(notifications.SIT_HERE);
  const [userAvatar] = useState(randomEmoji());
  const [userName] = useState({
    text: seat,
    color: "var(--color-text)"
  });

  // Calculate which widget is the current player
  const isUserSeat = userSeat === seat;

  // Player Animation Setup

  // Time Allowance for each player to act in milliseconds
  const timeAllowance = 30000;

  // State for counting the seconds
  const [secondsLeft, setSecondsLeft] = useState(timeAllowance);

  const playerNameColor =
    lastAction.action && seat == playerIdToString(lastAction.player)
      ? "var(--color-accent)"
      : userName.color;

  const handlePlayerClick = (seat: string) => (): void => {
    if (!connected) {
      playerJoin(seat, state, dispatch);
      setSeatMessage(notifications.SITTING);
    }
  };

  // Player Timer

  // Timer
  useEffect(() => {
    if (activePlayer === seat) {
      // Reset time allowance
      setSecondsLeft(timeAllowance);

      // Countdown
      const interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 100);
      }, 100);
      return (): void => clearInterval(interval);
    }
  }, [activePlayer]);

  // Check or fold if time is up
  useEffect(() => {
    if (!secondsLeft) {
      if (userSeat === activePlayer) {
        const nextAction: IMessage = lastMessage;
        nextAction.playerid = playerStringToId(userSeat);

        // The action that the player will be forced to take once the time is over
        const action = controls.canCheck
          ? Possibilities.check
          : Possibilities.fold;

        // The action that will be displayed on the player widget
        const lastAction = controls.canCheck
          ? PlayerActions.check
          : PlayerActions.fold;

        // Hide Controls
        showControls(false, dispatch);

        // Update the player's name with the last action
        setLastAction(nextAction.playerid, lastAction, dispatch);

        // Disable active player highlighting
        setActivePlayer(null, dispatch);

        // Send the message to the back-end
        nextAction.possibilities = [action];
        sendMessage(nextAction, Node.playerWrite , state, dispatch);
      }

      setActivePlayer(null, dispatch);
    }
  }, [secondsLeft]);

  // Play the time alert sound when time reaches 25%
  useEffect(() => {
    isUserSeat &&
      secondsLeft === timeAllowance * 0.25 &&
      sounds.timeAlert.play();
  }, [secondsLeft, isUserSeat]);

  return (
    <div
      css={css`
        ${playerWidget}
        grid-area: ${seat};
      `}
      onClick={handlePlayerClick(seat)}
      data-test={`player-widget-${seat}`}
    >
      {cardsDealt && showCards && hasCards && (
        <CardsWrapper>
          {/* Player's face up cards */}
          {isUserSeat && holeCards[0] && (
            <span>
              <Card card={holeCards[0]} />
              <Card card={holeCards[1]} />
            </span>
          )}
          {/* Other player's face up cards */}
          {userSeat !== seat && (gameTurn === showDown || isShowDown) && (
            <div>
              <Card card={playerCards[0]} />
              <Card card={playerCards[1]} />
            </div>
          )}
        </CardsWrapper>
      )}
      {hasCards && gameTurn !== 4 && !isShowDown && (
        <div
          css={css`${faceDownCards}
          display: ${isUserSeat && holeCards[0] ? "none" : "block"};`}
        >
          <CardFaceDown centered={!cardsDealt} seat={seat} seats={seats} />
          <CardFaceDown
            second
            centered={!cardsDealt}
            seat={seat}
            seats={seats}
          />
        </div>
      )}
      <PlayerInfo
        isActive={isActive}
        connected={connected}
        secondsLeft={secondsLeft}
      >
        <PlayerNameWrapper connected={connected}>
          <PlayerName color={playerNameColor} connected={connected}>
            {/* Show the player's name or the last action */}
            {!connected
              ? state.userSeat
                ? ""
                : seatMessage
              : lastAction.action && seat == playerIdToString(lastAction.player)
              ? lastAction.action
              : userName.text}
          </PlayerName>
          {connected && <Balance>{numberWithCommas(chips)}</Balance>}
        </PlayerNameWrapper>
        {connected && <PlayerEmoji>{userAvatar}</PlayerEmoji>}
      </PlayerInfo>
      {/* Active player countdown */}
      {isActive && (
        <PlayerHighlight secondsLeft={secondsLeft} data-test="player-highlight">
          <PlayerTimerBar
            secondsLeft={secondsLeft}
            data-test="player-timer-bar"
          />
        </PlayerHighlight>
      )}
    </div>
  );
};

export default Player;
