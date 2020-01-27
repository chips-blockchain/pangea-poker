import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Bet } from "../Chips";
import { GameTurns } from "../../lib/constants";

// This is the component that displays the main pot at the middle of table

interface IProps {
  mainPot: number;
  gameTurn: number;
  winners: string[];
}

const { showDown } = GameTurns;

const winnerPotLocation = {
  player1: {
    left: "25rem",
    top: "9.5rem"
  },
  player2: {
    left: "27rem",
    top: "14rem"
  }
};

const MainPot: React.FunctionComponent<IProps> = ({
  mainPot,
  gameTurn,
  winners
}) => {
  const potStyle = css`
    display: flex;
    justify-content: center;
    left: 0;
    margin: auto;
    position: absolute;
    right: 4rem;
    top: 19rem;
    transition-delay: 1s;
    transition: 0.5s ease-out;
  `;

  const isWinnerSelect = gameTurn === showDown && winners;

  return (
    <div>
      {/* Regular pot */}
      {!isWinnerSelect && (
        <div
          css={css`
            ${potStyle}
          `}
        >
          <Bet betAmount={mainPot} />
        </div>
      )}

      {/* Winner Pot(s) */}
      {isWinnerSelect &&
        winners.map(player => {
          return (
            <div
              css={css`
          ${potStyle}
          
          left: ${winnerPotLocation[player].left};
          top: ${winnerPotLocation[player].top};
        `}
              key={player}
            >
              <Bet betAmount={mainPot} />
            </div>
          );
        })}
    </div>
  );
};

export default MainPot;
