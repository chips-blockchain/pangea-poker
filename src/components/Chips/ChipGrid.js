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
          ". . player-9 . player-1 ."
          "player-8 . . . . player-2"
          "player-7 . . . . player-3"
          ". player-6 . player-5 player-4 .";

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
