import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import randomEmoji from "./randomEmoji";
import theme from "../../styles/theme";

const Player = props => {
  // const [seat, setSeat] = useState("player-1");
  // const [chips, setChips] = useState(0);
  // const [isMe, setIsMe] = useState(false);
  // const [hasCards, setHasCards] = useState(true);
  // const [isActive, setIsActive] = useState(false);

  return (
    <div
      css={css`
        align-items: center;
        justify-content: center;
        display: grid;
        grid-template-columns: 1fr 0.5fr;
        background: ${theme.moon.colors.background};
        box-sizing: border-box;
        box-shadow: inset 0 0 0.25rem rgba(255, 255, 255, 0.1);
        border-radius: 10rem;
        grid-area: ${props.seat};
      `}
    >
      <span
        css={css`
          margin-left: 1rem;
        `}
      >
        <div
          css={css`
            color: ${theme.moon.colors.superLightGray};
            font-size: 0.625rem;
            line-height: 0.875rem;
            text-align: center;
            text-transform: uppercase;
          `}
        >
          I'm {props.seat}
        </div>
        <div
          css={css`
            color: ${theme.moon.colors.primaryLight};
            font-size: 0.75rem;
            line-height: 1rem;
            text-align: center;
            text-transform: uppercase;
          `}
        >
          1,000,000
        </div>
      </span>
      <span
        css={css`
          font-size: 1.875rem;
          margin-right: 1rem;
        `}
      >
        {randomEmoji()}
      </span>
    </div>
  );
};

export default Player;
