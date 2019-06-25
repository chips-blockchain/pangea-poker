import React, { useState, useEffect, useContext } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Card from "../Card";
import randomEmoji from "../../lib/randomEmoji";
import useInterval from "../../lib/useInterval";
import numberWithCommas from "../../lib/numberWithCommas";
import theme from "../../styles/theme";
import cardBg from "../Card/cards/bg-red.svg";
import { DispatchContext, StateContext } from "../Table";
import { GameAPI } from "../Game";

const Player = props => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  // Miliseconds for each active player to act
  let timeAllowance = 30000;

  const [timeLeftToAct, setTimeLeftToAct] = useState(timeAllowance);
  const [percentLeft, setPercentLeft] = useState(100);
  const [userAvatar, setUserAvater] = useState(randomEmoji());
  const [userName, setUserName] = useState({
    text: props.seat,
    color: theme.moon.colors.superLightGray
  });

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
  //       // props.setPlayers({
  //       //   ...props.players,
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
  //       console.log(props.seat + "'s time is up.");
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

  let transitionSpeed = "1s ease-out";

  return (
    <div
      onClick={() => GameAPI.playerJoin(props.seat, state, dispatch)}
      css={css`
        grid-area: ${props.seat};
        position: relative;
        cursor: pointer;
      `}
    >
      {/* Wether or not to to show current cards */}
      {props.showCards && props.hasCards && (
        <div
          css={css`
            bottom: 0.875rem;
            left: 1.75rem;
            position: absolute;
            z-index: 1;
          `}
        >
          <Card card={props.holeCards[0]} />
          <Card card={props.holeCards[1]} />
        </div>
      )}
      {/* Whether or not the player has cards */}
      {!props.showCards && props.hasCards && (
        <div
          css={css`
            bottom: 0;
            left: 3rem;
            position: absolute;
            z-index: 1;
          `}
        >
          <img src={cardBg} alt="" />
          <img
            src={cardBg}
            css={css`
              position: relative;
              left: -2.25rem;
            `}
            alt=""
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
          ${props.isActive && "border: 2px solid " + colorChange() + ";"}
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
              color: ${userName.color};
              font-size: 0.625rem;
              line-height: 0.875rem;
              text-align: center;
              text-transform: uppercase;
            `}
          >
            {userName.text}
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
            {props.chips}
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
      {/* Active player countdown */}
      {props.isActive && (
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
      )}
    </div>
  );
};

export default Player;
