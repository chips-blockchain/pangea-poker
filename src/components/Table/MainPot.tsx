import { css } from "@emotion/core";
import { useEffect, useState } from "react";
import { Bet } from "../Chips";
import { setWinner } from "../../store/actions";

// This is the component that displays the main pot at the middle of table

interface IProps {
  mainPot: number;
  gameTurn: number;
  winner: string;
}

const MainPot: React.FunctionComponent<IProps> = ({
  mainPot,
  gameTurn,
  winner
}) => {
  const [winnerCoordinates, setWinnerCoordinates]: [
    { left: number | string; top: string },
    Function
  ] = useState({
    left: 0,
    top: "19rem"
  });

  // Temporarily way of determining the winner. Only works in heads up.
  // TODO: Separate the logic for the winner selection

  useEffect(() => {
    if (gameTurn === 4 && winner) {
      if (winner === "player1") {
        winnerCoordinates.left = "25rem";
        winnerCoordinates.top = "9.5rem";
      } else if (winner === "player2") {
        winnerCoordinates.left = "27rem";
        winnerCoordinates.top = "14rem";
      } else throw new Error("The winner is unclear");
    }
  }, [winner]);

  return (
    <div
      css={css`
        position: absolute;
        left: ${gameTurn === 4 ? winnerCoordinates.left : "0"};
        right: 4rem;
        margin: auto;
        display: flex;
        justify-content: center;
        top: ${gameTurn === 4 ? winnerCoordinates.top : "19rem"};
        transition: 0.5s ease-out;
        transition-delay: 1s;
      `}
    >
      <Bet betAmount={mainPot} />
    </div>
  );
};

export default MainPot;
