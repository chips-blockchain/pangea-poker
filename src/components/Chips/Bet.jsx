import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import numberWithCommas from "../../lib/numberWithCommas";
import Stack from "./Stack.jsx";

const Bet = props => {
  return (
    <span
      css={css`
        align-items: center;
        grid-area: ${props.forPlayer};
        display: grid;
        position: relative;
        ${props.forPlayer === "player2" || props.forPlayer === "player3"
          ? "grid-template-columns: 4rem 1.25rem; left: -3.5rem;"
          : "grid-template-columns: 1.25rem 4rem;"}
      `}
    >
      <span
        css={css`
          ${props.forPlayer === "player2" || props.forPlayer === "player3"
            ? "order: 2;"
            : "order: 1;"}
        `}
      >
        <Stack chips={props.betAmount} />
      </span>
      <span
        css={css`
          order: 1;
          color: ${theme.moon.colors.text};
          font-size: 0.625rem;
          padding: 0 0 0.5rem 0.3rem;
          position: relative;
          ${props.forPlayer === "player2" || props.forPlayer === "player3"
            ? "padding-right: 0.3rem; text-align: right; order: 1;"
            : ""};
        `}
      >
        {numberWithCommas(props.betAmount)}
      </span>
    </span>
  );
};

export default Bet;
