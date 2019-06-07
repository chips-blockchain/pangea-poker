import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import numberWithCommas from "../../lib/numberWithCommas";
import Chip from "./Chip";

const Bet = props => {
  return (
    <span
      css={css`
        grid-area: ${props.forPlayer};
        display: grid;
        grid-template-columns: 1.25rem 4rem;
      `}
    >
      <Chip />
      <span
        css={css`
          color: ${theme.moon.colors.text};
          font-size: 0.625rem;
          ${props.forPlayer === "player-2" || props.forPlayer === "player-3"
            ? "padding-right: 0.5rem;"
            : "padding-left: 0.5rem;"}
        `}
      >
        {numberWithCommas(props.betAmount)}
      </span>
    </span>
  );
};

export default Bet;
