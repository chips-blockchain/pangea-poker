import React, { useState } from "react";
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
          height: 100%;
        `}
      >
        <RCSlider
          onChange={e =>
            setRaiseAmount(
              Math.round(e / (minRaise - toCall)) * (minRaise - toCall)
            )
          }
          min={amount}
          value={raiseAmount}
          max={players[userSeat].chips + players[userSeat].betAmount}
        />
      </div>
    </div>
  );
};

export default Slider;
