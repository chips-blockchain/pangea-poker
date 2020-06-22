import Card, { CardFlip } from "../Card";
import {
  BoardContainer,
  FlopElem,
  BoardCard1,
  BoardCard2,
  River
} from "./css/BoardStyle";

// This component renders the boardcards (the flop, turn and river)

interface IProps {
  boardCards: string[];
  gameTurn: 0 | 1 | 2 | 3 | 4;
}

const Board: React.FunctionComponent<IProps> = ({ boardCards, gameTurn }) => {
  return (
    <BoardContainer>
      {/* Flop */}
      <FlopElem gameTurn={gameTurn}>
        <span>
          <Card card={boardCards[0]} />
        </span>
        <BoardCard1 gameTurn={gameTurn}>
          <Card card={boardCards[1]} />
        </BoardCard1>
        <BoardCard2 gameTurn={gameTurn}>
          <Card card={boardCards[2]} />
        </BoardCard2>
      </FlopElem>
      {/* Turn */}
      {boardCards.length >= 4 && (
        <CardFlip card={boardCards[3]} dealt={gameTurn >= 2} />
      )}
      <River>
        {/* River */}
        {boardCards.length === 5 && (
          <CardFlip card={boardCards[4]} dealt={gameTurn >= 3} />
        )}
      </River>
    </BoardContainer>
  );
};

export default Board;
