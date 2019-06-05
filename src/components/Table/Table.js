import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import Backgrounds from "./Backgrounds";
import { PlayerGrid9Max } from "../PlayerGrid";

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
        <PlayerGrid9Max>
          <h1
            css={css`
              color: white;
              grid-area: player-1;
              background-color: red;
              width: 156px;
              height: 48px;
            `}
          >
            player-1
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-2;
              background-color: red;
              width: 156px;
              height: 48px;
            `}
          >
            player-2
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-3;
              background-color: red;
              width: 156px;
              height: 48px;
            `}
          >
            player-3
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-4;
              background-color: red;
              width: 156px;
              height: 48px;
            `}
          >
            player-4
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-5;
              background-color: red;
              width: 156px;
              height: 48px;
            `}
          >
            player-5
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-6;
              background-color: red;
              width: 156px;
              height: 48px;
            `}
          >
            player-6
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-7;
              background-color: red;
              width: 156px;
              height: 48px;
            `}
          >
            player-7
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-8;
              background-color: red;
              width: 156px;
              height: 48px;
            `}
          >
            player-8
          </h1>
          <h1
            css={css`
              color: white;
              grid-area: player-9;
              background-color: red;
              width: 156px;
              height: 48px;
            `}
          >
            player-9
          </h1>
        </PlayerGrid9Max>
      </div>
      <Backgrounds />
    </div>
  );
};

export default Table;
