import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import numberWithCommas from "../../lib/numberWithCommas";
import theme from "../../styles/theme";
import { updateMainPot, updateTotalPot } from "../Game/gameAPI";

const TotalPot = ({ state, dispatch }) => {
  const { chipsCollected, gameTurn, players, pot, totalPot } = state;

  // Count all the players' bets and the pot
  useEffect(() => {
    let sumBetAmount = 0;
    !chipsCollected &&
      Object.values(players).map(player => {
        if (player.isPlaying) sumBetAmount += player.betAmount;
      });
    updateTotalPot(pot[0] + sumBetAmount, dispatch);
  }, [players]);

  useEffect(() => {
    updateMainPot(totalPot, dispatch);
  }, [gameTurn]);

  return (
    <div
      css={css`
        color: ${theme.moon.colors.text};
        top: 12rem;
        font-size: 0.75rem;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        text-align: center;
      `}
    >
      Pot: {numberWithCommas(totalPot)}
    </div>
  );
};

export default TotalPot;
