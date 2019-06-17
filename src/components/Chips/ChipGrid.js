import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const ChipsGrid = props => {
  return (
    <div
      css={css`
        align-items: end;
        display: grid;
        grid-template-columns: 1.75rem 4rem 6.625rem 7.875rem 4rem 1.75rem;
        grid-template-rows: 2.625rem 3.75rem 4.875rem 2.75rem;
        grid-template-areas:
          ". . player9 . player1 ."
          "player8 . . . . player2"
          "player7 . . . . player3"
          ". player6 . player5 player4 .";

        position: absolute;
        top: 9.5rem;
        left: 12rem;
      `}
    >
      {props.children}
    </div>
  );
};

export default ChipsGrid;
