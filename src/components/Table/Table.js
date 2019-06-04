import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import Backgrounds from "./Backgrounds";

const Table = () => {
  return (
    <div
      css={css`
        background-color: ${theme.moon.colors.dark};
        height: 37.5rem;
        width: 50rem;
        position: relative;
      `}
    >
      <div
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        `}
      >
        {/* Grid to lay out Player Widgets */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 9.75rem 0.25rem 9.75rem 6.5rem 9.75rem 0.25rem 9.75rem;
            grid-template-rows: 3rem 3.625rem 3rem 3.625rem 3rem 3.625rem 3rem;
            grid-template-areas:
              ". . player-10 . player-1 . ."
              ". . . . . . ."
              "player-9 .  . . . . player-2"
              ". . . . . . ."
              "player-8 . . . . . player-3"
              ". . . . . . ."
              ". player-7 . player-6 . player-5 .";
            padding: 6rem 0 0 2rem;
          `}
        >
          <h1
            css={css`
              color: white;
              grid-area: player-1;
            `}
          >
            player-1
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-2;
            `}
          >
            player-2
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-3;
            `}
          >
            player-3
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-4;
            `}
          >
            player-4
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-5;
            `}
          >
            player-5
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-6;
            `}
          >
            player-6
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-7;
            `}
          >
            player-7
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-8;
            `}
          >
            player-8
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-9;
            `}
          >
            player-9
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-10;
            `}
          >
            player-10
          </h1>
        </div>
      </div>
      <Backgrounds />
    </div>
  );
};

export default Table;
