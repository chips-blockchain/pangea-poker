import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import chip1B from "./chip-1B.svg";

const ChipsGrid = () => {
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
      <img
        css={css`
          grid-area: player-1;
        `}
        src={chip1B}
      />
      <img
        css={css`
          grid-area: player-2;
        `}
        src={chip1B}
      />
      <img
        css={css`
          grid-area: player-3;
        `}
        src={chip1B}
      />
      <img
        css={css`
          grid-area: player-4;
          justify-self: end;
        `}
        src={chip1B}
      />
      <img
        css={css`
          grid-area: player-5;
        `}
        src={chip1B}
      />
      <img
        css={css`
          grid-area: player-6;
        `}
        src={chip1B}
      />
      <img
        css={css`
          grid-area: player-7;
        `}
        src={chip1B}
      />
      <img
        css={css`
          grid-area: player-8;
        `}
        src={chip1B}
      />
      <img
        css={css`
          grid-area: player-9;
        `}
        src={chip1B}
      />
    </div>
  );
};

export default ChipsGrid;
