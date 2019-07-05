import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import numberWithCommas from "../../lib/numberWithCommas";
import theme from "../../styles/theme";

const TotalPot = ({ players, pot }) => {
  const [totalPot, setTotalPot] = useState(0);

  useEffect(() => {
    let sumBetAmount = 0;
    Object.values(players).map(player => {
      if (player.isPlaying) sumBetAmount += player.betAmount;
    });
    setTotalPot(pot[0] + sumBetAmount);
  }, [players]);

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
