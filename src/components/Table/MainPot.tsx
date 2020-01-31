import { css } from "@emotion/core";
import { Bet } from "../Chips";
import { GameTurns } from "../../lib/constants";

// This is the component that displays the main pot at the middle of table

interface IProps {
  pot: number[];
  gameTurn: number;
  winners: string[];
}

const { showDown } = GameTurns;

// Coordinates for where the winner's pot should be pushed
const winnerPotLocation = {
  player1: {
    left: "25rem",
    top: "9.5rem"
  },
  player2: {
    left: "30rem",
    top: "14rem"
  }
};

const MainPot: React.FunctionComponent<IProps> = ({
  pot,
  gameTurn,
  winners
}) => {
  const isWinnerSelectTurn = gameTurn === showDown && winners;

  // Main Pot's position at the center of the screen
  const { left, top } = {
    left: 0,
    top: "19rem"
  };

  // Shared pot style
  const potStyle = css`
    display: flex;
    justify-content: center;
    left: ${left};
    margin: auto;
    position: absolute;
    right: 4rem;
    top: ${top};
    animation-iteration-count: 1;
  `;

  return (
    <div>
      {winners.map((player, index) => {
        // Custom animation style for each winner to send each pot to the right location
        const animationStyle = css`
          animation: ${isWinnerSelectTurn &&
            `${`winnerSelect-${player}`} 0.5s ease-out 1s forwards`};
          @keyframes ${`winnerSelect-${player}`} {
            0% {
              left: ${left};
              top: ${top};
            }
            100% {
              left: ${player && winnerPotLocation[player].left};
              top: ${player && winnerPotLocation[player].top};
            }
          }
        `;

        return (
          <div
            css={css`
              ${potStyle}
              ${animationStyle}
            `}
            key={player}
          >
            <Bet betAmount={pot && pot[0]} />
          </div>
        );
      })}
    </div>
  );
};

export default MainPot;
