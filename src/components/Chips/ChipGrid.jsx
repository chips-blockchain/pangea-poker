import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const ChipsGrid = ({ chipsCollected, children }) => {
  return (
    <div
      css={css`
        grid-template-columns: ${chipsCollected
          ? "8rem 0rem 0rem 0rem 0rem 0rem 0rem 13rem"
          : "0rem 1.75rem 4rem 6.625rem 7.875rem 4rem 1.75rem 0rem;"};
        align-items: end;
        display: grid;
        grid-template-rows: ${chipsCollected
          ? "12rem  0rem 0rem 0rem 0rem 12em"
          : "0rem 2.625rem 3.75rem 4.875rem 2.75rem 0rem;"};

        grid-template-areas:
          ". . . . . . . ."
          ". . . player9 . player1 . ."
          ". player8 . . . . player2 ."
          ". player7 . . . . player3 ."
          ". . player6 . player5 player4 . ."
          ". . . . . . . .";
        position: absolute;
        top: 9.5rem;
        left: 12rem;
        transition: 0.4s ease all;
      `}
    >
      {children}
    </div>
  );
};

export default ChipsGrid;
