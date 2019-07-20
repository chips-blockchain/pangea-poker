import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import RCSlider from "rc-slider";
import "./slider.css";

const Slider = ({
  minRaise,
  players,
  raiseAmount,
  setRaiseAmount,
  toCall,
  userSeat
}) => {
  const [amount, setAmount] = useState(raiseAmount);

  useEffect(() => {}, [raiseAmount]);

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
            if (e >= players[userSeat].chips) {
              setRaiseAmount(e);
            } else {
              const roundedValue =
                Math.round(e / (minRaise - toCall)) * (minRaise - toCall);
              setRaiseAmount(
                roundedValue > players[userSeat].chips
                  ? players[userSeat].chips
                  : roundedValue
              );
            }
          }}
          min={amount}
          // step={minRaise - toCall}
          value={raiseAmount}
          max={players[userSeat].chips + players[userSeat].betAmount}
        />
      </div>
    </div>
  );
};

export default Slider;
