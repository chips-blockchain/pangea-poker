import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useState, useEffect, useContext } from "react";
import Card from "../Card";
import { CardFaceDown } from "../Card";
import randomEmoji from "../../lib/randomEmoji";
import useInterval from "../../lib/useInterval";
import numberWithCommas from "../../lib/numberWithCommas";
import theme from "../../styles/theme";
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
import { IPlayer, IState } from "../../store/initialState";
import { IMessage } from "../Game/onMessage";
import { Possibilities, PlayerActions } from "../../lib/constants";

// This is the Player widget that shows the player avatar, the chips amount, wether the player has cards, etc

interface IProps extends IPlayer {
  chips: number;
  connected: boolean;
  isActive: boolean;
  winner: string;
}

const Player: React.FunctionComponent<IProps> = ({
  chips,
  connected,
  hasCards,
  isActive,
  playerCards,
  seat,
  showCards,
  winner
}) => {
  const dispatch: Function = useContext(DispatchContext);
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

  const [seatMessage, setSeatMessage] = useState("SIT HERE");
  const [userAvatar, setUserAvater] = useState(randomEmoji());
  const [userName, setUserName] = useState({
    text: seat,
    color: theme.moon.colors.superLightGray
  });

  // Calculate which widget is the current player
  const isUserSeat = userSeat === seat;

  // Player Animation Setup

  // Time Allowance for each player to act in milliseconds
  const timeAllowance = 30000;

  // Transition speed for the timer animation in seconds
  const transitionSpeed = 0.1;

  // State for counting the seconds
  const [secondsLeft, setSecondsLeft] = useState(timeAllowance);

  // Styles

  // Rules to change the colors when the time is low
  const colorChange = () => {
    return secondsLeft > timeAllowance * 0.25
      ? theme.moon.colors.accent
      : theme.moon.colors.danger;
  };

  const Balance = styled.div`
    color: ${theme.moon.colors.primaryLight};
    font-size: 0.75rem;
    line-height: 1rem;
    text-align: center;
    text-transform: uppercase;
  `;

  const CardsWrapper = styled.div`
    bottom: 0.875rem;
    left: 1.75rem;
    position: absolute;
    opacity: ${winner && gameTurn === 4 && winner !== seat ? "0.5" : "1"};
    z-index: 1;
  `;

  const faceDownCards = css`
    bottom: 0;
    left: 3rem;
    position: absolute;
    z-index: 1;
  `;

  const PlayerInfo = styled.div`
   align-items: center;
    display: grid;
    background: ${theme.moon.colors.background};
    border-radius: 10rem;
    box-sizing: border-box;
    box-shadow: inset 0 0 0.25rem rgba(255, 255, 255, 0.1);
    /* ${isActive && "border: 2px solid " + colorChange() + ";"} */
    border: 2px solid ${isActive ? colorChange() : "transparent"};
    ${connected && "grid-template-columns: 1fr 0.5fr;"}
    height: 100%;
    justify-content: center;
    transition: ${transitionSpeed};
    position: absolute;
    width: 100%;
    z-index: 2;

    &:hover div {
      ${!connected && `color: ${theme.moon.colors.accent}`};
    }
  `;

  const PlayerEmoji = styled.span`
    font-size: 1.875rem;
    margin-right: 1rem;
  `;

  const PlayerName = styled.div`
    color: ${lastAction.action && seat == playerIdToString(lastAction.player)
      ? theme.moon.colors.accent
      : userName.color};
    font-size: ${connected ? "0.625rem" : "1rem"};
    line-height: 0.875rem;
    text-align: center;
    text-transform: uppercase;
  `;

  const playerWidget = css`
    position: relative;
    cursor: pointer;
  `;

  // Player Timer

  // Timer
  useEffect(() => {
    if (activePlayer) {
      // Reset time allowance
      setSecondsLeft(timeAllowance);

      // Countdown
      const interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 100);
      }, 100);
      return () => clearInterval(interval);
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
        sendMessage(nextAction, userSeat, state, dispatch);
      }

      setActivePlayer(null, dispatch);
    }
  }, [secondsLeft]);

  return (
    <div
      css={css`
        ${playerWidget}
        grid-area: ${seat};
      `}
      onClick={() => {
        if (!connected) {
          playerJoin(seat, state, dispatch);
          setSeatMessage("SITTING...");
        }
      }}
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
          {userSeat !== seat && (gameTurn === 4 || isShowDown) && (
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
      <PlayerInfo>
        <span
          css={css`
            ${connected && "margin-left: 1rem"};
          `}
        >
          <PlayerName>
            {/* Show the player's name or the last action */}
            {!connected
              ? seatMessage
              : lastAction.action && seat == playerIdToString(lastAction.player)
              ? lastAction.action
              : userName.text}
          </PlayerName>
          {connected && <Balance>{numberWithCommas(chips)}</Balance>}
        </span>
        {connected && <PlayerEmoji>{userAvatar}</PlayerEmoji>}
      </PlayerInfo>
      {/* Active player countdown */}
      {isActive && (
        <div
          css={css`
            background: ${theme.moon.colors.background};
            border: 2px solid ${colorChange()};
            height: 0.5rem;
            margin: auto;
            position: relative;
            top: 2.875rem;
            transition: ${transitionSpeed}s;
            width: 6.75rem;
          `}
          data-test="player-highlight"
        >
          <div
            css={css`
              background-color: ${colorChange()};
              height: 0.5rem;
              width: ${(secondsLeft / timeAllowance) * 100}%;
              transition: ${transitionSpeed}s;
            `}
            data-test="player-timer-bar"
          />
        </div>
      )}
    </div>
  );
};

export default Player;
