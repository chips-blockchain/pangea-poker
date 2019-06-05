import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const PlayerGrid9Max = props => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 5.5rem 4.25rem 0.25rem 5.25rem 2.875rem 1.625rem 6.625rem 1.625rem 2.875rem 5.25rem 0.25rem 4.25rem 5.5rem;
        grid-template-rows: 3rem 3.625rem 3rem 3.625rem 3rem 3.625rem 3rem;
        grid-template-areas:
          ". . . player-9 player-9 player-9 . player-1 player-1 player-1 . . ."
          ". . . . . . . . . . . . ."
          "player-8 player-8 . . . . . . . . . player-2 player-2"
          ". . . . . . . . . . . . ."
          "player-7 player-7 . . . . . . . . . player-3 player-3"
          ". . . . . . . . . . . . ."
          ". player-6 player-6 player-6 . player-5 player-5 player-5 . player-4 player-4 player-4 .";
        padding: 6rem 0 0 2rem;
      `}
    >
      {props.children}
    </div>
  );
};

const PlayerGrid6Max = props => {
  return (
    <div>
      {/* TODO: Set up 6-max grid */}
      {props.children}
    </div>
  );
};

export { PlayerGrid9Max, PlayerGrid6Max };
