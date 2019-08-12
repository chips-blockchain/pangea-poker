import { css } from "@emotion/core";
import React, { useState, useEffect, useContext } from "react";
import Card from "../Card";
import { CardFaceDown } from "../Card";
import randomEmoji from "../../lib/randomEmoji";
import useInterval from "../../lib/useInterval";
import numberWithCommas from "../../lib/numberWithCommas";
import theme from "../../styles/theme";
import { DispatchContext, StateContext } from "../store/context";
import { playerJoin } from "../store/actions";
import playerIdToString from "../../lib/playerIdToString";
import { IPlayer, IState } from "../store/initialState";

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
    cardsDealt,
    gameTurn,
    holeCards,
    lastAction,
    seats,
    userSeat
  } = state;
  // Miliseconds for each active player to act
  let timeAllowance = 30000;

  const [balanceMessage, setBalanceMessage] = useState("CLICK TO SIT");
  const [timeLeftToAct, setTimeLeftToAct] = useState(timeAllowance);
  const [percentLeft, setPercentLeft] = useState(100);
  const [userAvatar, setUserAvater] = useState(randomEmoji());
  const [userName, setUserName] = useState({
    text: seat,
    color: theme.moon.colors.superLightGray
  });

  // Timer Logic that has been disabled for now

  // // Set deadline for the to active player
  // let deadlineToAct = new Date();
  // deadlineToAct.setSeconds(deadlineToAct.getSeconds() + timeLeftToAct / 1000);

  // // Countdown
  // useInterval(
  //   () => {
  //     const now = new Date().getTime();
  //     if (timeLeftToAct > 0) {
  //       let timeLeft = Math.floor(deadlineToAct - now);
  //       setTimeLeftToAct(Math.max(0, timeLeft));
  //     }
  //   },
  //   timeLeftToAct > 0 ? 1000 : null
  // );

  // // Function to execute when time is up
  // useEffect(() => {
  //   if (timeLeftToAct <= 0) {
  //     setTimeout(() => {
  //       setUserName({ text: "Fold", color: theme.moon.colors.accent });
  //       // Have to use useReducer instead
  //       // setPlayers({
  //       //   ...players,
  //       //   player5: {
  //       //     isPlaying: true,
  //       //     seat: "player5",
  //       //     chips: 783900,
  //       //     hasCards: false,
  //       //     showCards: false,
  //       //     isBetting: false,
  //       //     betAmount: 27500
  //       //   }
  //       // });
  //       console.log(seat + "'s time is up.");
  //     }, 1500);
  //   }
  // }, []);

  // // Update the percentage of time left
  // useEffect(() => {
  //   setPercentLeft(
  //     ((timeAllowance - (timeAllowance - timeLeftToAct)) / timeAllowance) * 100
  //   );
  // });

  // Rules to change the colors
  const colorChange = () => {
    return percentLeft > 75
      ? theme.moon.colors.primary
      : percentLeft > 25
      ? theme.moon.colors.accent
      : theme.moon.colors.danger;
  };

  const transitionSpeed = "0";

  return (
    <div
      onClick={() => {
        playerJoin(seat, state, dispatch);
        setBalanceMessage("SITTING...");
      }}
      css={css`
        grid-area: ${seat};
        position: relative;
        cursor: pointer;
      `}
    >
      {/* Wether or not to to show current cards */}
      {cardsDealt && showCards && hasCards && (
        <div
          css={css`
            bottom: 0.875rem;
            left: 1.75rem;
            position: absolute;
            z-index: 1;
          `}
        >
          {/* User's cards */}
          {userSeat === seat && holeCards[0] && (
            <span>
              <Card card={holeCards[0]} />
              <Card card={holeCards[1]} />
            </span>
          )}
          {/* Other player's cards */}
          {userSeat !== seat && gameTurn === 4 && (
            <div
              css={css`
                opacity: ${winner !== userName ? "0.5" : "1"};
              `}
            >
              <Card card={playerCards[0]} />
              <Card card={playerCards[0]} />
            </div>
          )}
        </div>
      )}
      {/* Whether or not the player has cards */}
      {hasCards && gameTurn !== 4 && (
        <div
          css={css`
            bottom: 0;
            left: 3rem;
            position: absolute;
            z-index: 1;
            display: ${userSeat === seat && holeCards[0] ? "none" : "block"};
          `}
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
      {/* Player info widget */}
      <div
        css={css`
          align-items: center;
          display: grid;
          background: ${theme.moon.colors.background};
          border-radius: 10rem;
          box-sizing: border-box;
          box-shadow: inset 0 0 0.25rem rgba(255, 255, 255, 0.1);
          /* ${isActive && "border: 2px solid " + colorChange() + ";"} */
          border: 2px solid ${
            isActive ? theme.moon.colors.accent : "transparent"
          };
          grid-template-columns: 1fr 0.5fr;
          height: 100%;
          justify-content: center;
          transition: ${transitionSpeed};
          position: absolute;
          width: 100%;
          z-index: 2;
        `}
      >
        <span
          css={css`
            margin-left: 1rem;
          `}
        >
          {/* Player name area */}
          <div
            css={css`
              color: ${lastAction.action &&
              seat == playerIdToString(lastAction.player)
                ? theme.moon.colors.accent
                : userName.color};
              font-size: 0.625rem;
              line-height: 0.875rem;
              text-align: center;
              text-transform: uppercase;
            `}
          >
            {/* Show the player's name or the last action */}
            {lastAction.action && seat == playerIdToString(lastAction.player)
              ? lastAction.action
              : userName.text}
          </div>
          {/* Available chips */}
          <div
            css={css`
              color: ${theme.moon.colors.primaryLight};
              font-size: 0.75rem;
              line-height: 1rem;
              text-align: center;
              text-transform: uppercase;
            `}
          >
            {connected ? numberWithCommas(chips) : balanceMessage}
          </div>
        </span>
        {/* Player emoji */}
        <span
          css={css`
            font-size: 1.875rem;
            margin-right: 1rem;
          `}
        >
          {userAvatar}
        </span>
      </div>
      {/* The timer is temporarily disabled */}
      {/* Active player countdown */}
      {/* {isActive && (
        <div
          css={css`
            background: ${theme.moon.colors.background};
            border: 2px solid ${colorChange()};
            height: 0.5rem;
            margin: auto;
            position: relative;
            top: 2.875rem;
            transition: ${transitionSpeed};
            width: 6.75rem;
          `}
        >
          <div
            css={css`
              background-color: ${colorChange()};
              height: 0.5rem;
              width: ${percentLeft}%;
              transition: ${transitionSpeed};
            `}
          />
        </div>
      )} */}
    </div>
  );
};

export default Player;
