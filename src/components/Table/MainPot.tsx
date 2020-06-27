import { Bet } from "../Chips";
import { GameTurns } from "../../lib/constants";
import { PotContainer } from "./assets/style";

// This is the component that displays the main pot at the middle of table

interface IProps {
  pot: number[];
  gameTurn: number;
  winners: string[];
}

const { showDown } = GameTurns;

const MainPot: React.FunctionComponent<IProps> = ({
  pot,
  gameTurn,
  winners
}) => {
  const isWinnerSelectTurn = gameTurn === showDown && winners;

  return (
    <div>
      {winners.map((player, index) => {
        // Custom animation style for each winner to send each pot to the right location
        return (
          <PotContainer
            isWinnerSelectTurn={isWinnerSelectTurn}
            player={player}
            key={player + index}
            data-test={`main-pot${player ? `-${player}` : ``}`}
          >
            <Bet betAmount={pot && pot[0]} />
          </PotContainer>
        );
      })}
    </div>
  );
};

export default MainPot;
