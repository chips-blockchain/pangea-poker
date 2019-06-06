import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import Backgrounds from "./Backgrounds";
import { PlayerGrid9Max } from "../PlayerGrid";
import Player from "../Player";
import Card from "../Card";

const Table = () => {
  const [players, setPlayers] = useState([
    {
      isPlaying: true,
      seat: "player-1",
      chips: 783900,
      hasCards: true,
      isMe: true
    },
    {
      isPlaying: true,
      seat: "player-2",
      chips: 65984,
      hasCards: true,
      isMe: false
    },
    {
      isPlaying: true,
      seat: "player-3",
      chips: 677854,
      hasCards: true,
      isMe: false
    },
    {
      isPlaying: true,
      seat: "player-4",
      chips: 900999,
      hasCards: true,
      isMe: false
    },
    {
      isPlaying: true,
      seat: "player-5",
      chips: 10008942,
      hasCards: true,
      isMe: false
    },
    {
      isPlaying: true,
      seat: "player-6",
      chips: 78400,
      hasCards: true,
      isMe: false
    },
    {
      isPlaying: true,
      seat: "player-7",
      chips: 800800,
      hasCards: true,
      isMe: false
    },
    {
      isPlaying: true,
      seat: "player-8",
      chips: 12000,
      hasCards: true,
      isMe: false
    },
    {
      isPlaying: true,
      seat: "player-9",
      chips: 650000,
      hasCards: true,
      isMe: false
    }
  ]);
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
          {players.map(
            player =>
              player.isPlaying && (
                <Player
                  seat={player.seat}
                  hasCards={player.hasCards}
                  chips={player.chips}
                  key={player.seat}
                />
              )
          )}
        </PlayerGrid9Max>
        <Card card="Qh" />
      </div>
      <Backgrounds />
    </div>
  );
};

export default Table;
