import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import Backgrounds from "./Backgrounds";
import { PlayerGrid9Max } from "../PlayerGrid";
import Player from "../Player";

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
          <Player seat="player-1" />
          <Player seat="player-2" />
          <Player seat="player-3" />
          <Player seat="player-4" />
          <Player seat="player-5" />
          <Player seat="player-6" />
          <Player seat="player-7" />
          <Player seat="player-8" />
          <Player seat="player-9" />
        </PlayerGrid9Max>
      </div>
      <Backgrounds />
    </div>
  );
};

export default Table;
