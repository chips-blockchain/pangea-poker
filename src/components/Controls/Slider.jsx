import { css } from "@emotion/core";
import { useContext, useEffect } from "react";
import { StateContext } from "../store/context";
import theme from "../../styles/theme";
import RCSlider from "rc-slider";
import "./slider.css";

const Slider = ({ raiseAmount, setRaiseAmount }) => {
  const state = useContext(StateContext);
  const { minRaise, players, toCall, userSeat } = state;

  // Reset the raise amount on the slider when the minimum raise changes
  useEffect(() => {
    setRaiseAmount(minRaise);
  }, [minRaise]);

  return (
    <div
      css={css`
        margin: 0.125rem 0.125rem 0.25rem 0.125rem;
      `}
    >
      <div
        css={css`
          background: ${theme.moon.colors.background};
          justify-content: flex-start;
          align-items: center;
          border: 0.0625rem solid ${theme.moon.colors.primary};
          border-radius: 0.125rem;
          display: inline-block;
          display: flex;
          height: 1.6rem;
        `}
      >
        <RCSlider
          onChange={e => {
            setRaiseAmount(e);
            // if (e >= players[userSeat].chips) {
            //   setRaiseAmount(e);
            // } else {
            //   const roundedValue =
            //     Math.round(e / (minRaise - toCall)) * (minRaise - toCall);
            //   setRaiseAmount(
            //     roundedValue > players[userSeat].chips
            //       ? players[userSeat].chips
            //       : roundedValue
            //   );
            // }
          }}
          min={minRaise}
          step={minRaise - toCall}
          value={raiseAmount}
          max={players[userSeat].chips + players[userSeat].betAmount}
        />
      </div>
    </div>
  );
};

export default Slider;
