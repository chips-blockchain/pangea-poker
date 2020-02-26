import { css } from "@emotion/core";
import { useContext, useEffect } from "react";
import { StateContext } from "../../store/context";
import RCSlider from "rc-slider";
import "./slider.css";
import { IState } from "../../store/initialState";

// This is the Slider component used in Controls to set bet/raise amount

const Slider = ({ raiseAmount, setRaiseAmount }) => {
  const state: IState = useContext(StateContext);
  const { minRaiseTo, players, toCall, userSeat } = state;

  const chips = players[userSeat].chips;
  const betAmount = players[userSeat].betAmount;
  const totalStack = chips + betAmount;
  const step = minRaiseTo - toCall;

  // Have to round up total stack to a value that is a step increment of the slider so the All-in can be rounded down accordingly
  const roundedMax = totalStack - (totalStack % step) + toCall;

  // Reset the raise amount on the slider when the minimum raise changes
  useEffect(() => {
    setRaiseAmount(minRaiseTo);
  }, [minRaiseTo]);

  // Round the top step of the slider down to the total stack of the player
  const handleSliderAmount = sliderStep => {
    if (sliderStep > totalStack) setRaiseAmount(totalStack);
    else return setRaiseAmount(sliderStep);
  };

  return (
    <div
      css={css`
        margin: 0.125rem 0.125rem 0.25rem 0.125rem;
      `}
    >
      <div
        css={css`
          align-items: center;
          background: var(--color-background);
          border: 0.0625rem solid var(--color-primary);
          display: inline-block;
          display: flex;
          border-radius: 0.125rem;
          height: 1.6rem;
          justify-content: flex-start;
        `}
      >
        <RCSlider
          onChange={e => {
            handleSliderAmount(e);
          }}
          min={minRaiseTo}
          step={step}
          max={roundedMax}
        />
      </div>
    </div>
  );
};

export default Slider;
