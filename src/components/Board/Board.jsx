import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Card from "../Card";

const Board = ({ boardCards, gameTurn }) => {
  return (
    <div
      css={css`
        height: 4.25rem;
        position: absolute;
        top: 13.75rem;
        left: 17rem;
      `}
    >
      {/* Flop */}
      <span
        css={css`
          opacity: ${gameTurn == 0 ? "0" : "1"};
          transition: 0s all;
          transition-delay: 0.5s;
        `}
      >
        <span css={css``}>
          <Card card={boardCards[0]} />
        </span>
        <span
          css={css`
            position: relative;
            right: ${gameTurn == 0 ? "3.25rem" : "0"};
            transition: 0.5s ease all;
            transition-delay: 0.5s;
          `}
        >
          <Card card={boardCards[1]} />
        </span>
        <span
          css={css`
            position: relative;
            right: ${gameTurn == 0 ? "6.5rem" : "0"};
            transition: 0.5s ease all;
            transition-delay: 0.5s;
          `}
        >
          <Card card={boardCards[2]} />
        </span>
      </span>
      {/* Turn */}
      <Card card={boardCards[3]} />
      {/* River */}
      <Card card={boardCards[4]} />
    </div>
  );
};

export default Board;
