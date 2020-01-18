import { css } from "@emotion/core";
import Card, { CardFlip } from "../Card";
import { GameTurns } from "../../lib/constants";

// This component renders the boardcards (the flop, turn and river)

interface IProps {
  boardCards: string[];
  gameTurn: 0 | 1 | 2 | 3 | 4;
}

const { preFlop } = GameTurns;

const Board: React.FunctionComponent<IProps> = ({ boardCards, gameTurn }) => {
  return (
    <div
      css={css`
        height: 4.25rem;
        position: absolute;
        top: 13.75rem;
        left: 17rem;
      `}
    >
      {/* Flop */}
      <span
        css={css`
          opacity: ${gameTurn === preFlop ? "0" : "1"};
          transition: 0s all;
          transition-delay: 0.5s;
        `}
      >
        <span>
          <Card card={boardCards[0]} />
        </span>
        <span
          css={css`
            position: relative;
            right: ${gameTurn === preFlop ? "3.25rem" : "0"};
            transition: 0.5s ease all;
            transition-delay: 0.5s;
          `}
        >
          <Card card={boardCards[1]} />
        </span>
        <span
          css={css`
            position: relative;
            right: ${gameTurn === preFlop ? "6.5rem" : "0"};
            transition: 0.5s ease all;
            transition-delay: 0.5s;
          `}
        >
          <Card card={boardCards[2]} />
        </span>
      </span>
      {/* Turn */}

      {boardCards.length >= 4 && (
        <CardFlip card={boardCards[3]} dealt={gameTurn >= 2} />
      )}
      <span
        css={css`
          position: relative;
          left: 0.125rem;
        `}
      >
        {/* River */}
        {boardCards.length === 5 && (
          <CardFlip card={boardCards[4]} dealt={gameTurn >= 3} />
        )}
      </span>
    </div>
  );
};

export default Board;
