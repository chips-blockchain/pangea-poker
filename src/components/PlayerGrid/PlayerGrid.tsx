import { css } from "@emotion/core";

interface IProps {
  children: React.ReactNode;
}

const PlayerGrid9Max: React.FunctionComponent<IProps> = ({ children }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 5.5rem 4.25rem 0.25rem 5.25rem 2.875rem 1.625rem 6.625rem 1.625rem 2.875rem 5.25rem 0.25rem 4.25rem 5.5rem;
        grid-template-rows: 3rem 3.625rem 3rem 3.625rem 3rem 3.625rem 3rem;
        grid-template-areas:
          ". . . player9 player9 player9 . player1 player1 player1 . . ."
          ". . . . . . . . . . . . ."
          "player8 player8 . . . . . . . . . player2 player2"
          ". . . . . . . . . . . . ."
          "player7 player7 . . . . . . . . . player3 player3"
          ". . . . . . . . . . . . ."
          ". player6 player6 player6 . player5 player5 player5 . player4 player4 player4 .";
        padding: 6rem 0 0 2rem;
      `}
    >
      {children}
    </div>
  );
};

const PlayerGrid6Max: React.FunctionComponent<IProps> = ({ children }) => {
  return (
    <div>
      {/* TODO: Set up 6-max grid */}
      {children}
    </div>
  );
};

export { PlayerGrid9Max, PlayerGrid6Max };
