import { css } from "@emotion/core";
import { useContext, useEffect } from "react";
import { StateContext } from "../../store/context";
import theme from "../../styles/theme";
import RCSlider from "rc-slider";
import "./slider.css";
import { IState } from "../../store/initialState";

// This is the Slider component used in Controls to set bet/raise amount

const Slider = ({ raiseAmount, setRaiseAmount }) => {
  const state: IState = useContext(StateContext);
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
          align-items: center;
          background: ${theme.moon.colors.background};
          border: 0.0625rem solid ${theme.moon.colors.primary};
          display: inline-block;
          display: flex;
          border-radius: 0.125rem;
          height: 1.6rem;
          justify-content: flex-start;
        `}
      >
        <RCSlider
          onChange={e => {
            setRaiseAmount(e);
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
