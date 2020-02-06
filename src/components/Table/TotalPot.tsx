import { css } from "@emotion/core";
import { useEffect } from "react";
import numberWithCommas from "../../lib/numberWithCommas";
import theme from "../../styles/theme";
import { updateMainPot, updateTotalPot } from "../../store/actions";
import { IState } from "../../store/initialState";

// This component shows the total pot amount right above the boardCards

interface IProps {
  state: IState;
  dispatch: (arg: object) => void;
}

const TotalPot: React.FunctionComponent<IProps> = ({ state, dispatch }) => {
  const { chipsCollected, gameTurn, players, pot, totalPot } = state;

  // Count all the players' bets and the pot
  useEffect(() => {
    if (!chipsCollected) {
      let sumBetAmount = 0;
      Object.values(players).map(player => {
        if (player.isPlaying) sumBetAmount += player.betAmount;
      });
      updateTotalPot(pot[0] + sumBetAmount, dispatch);
    }
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
