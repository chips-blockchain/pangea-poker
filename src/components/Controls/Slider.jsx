import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import RCSlider from "rc-slider";
import "./slider.css";

const Slider = ({ players, raiseAmount, setRaiseAmount, userSeat }) => {
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
          width: 11.375rem;
        `}
      >
        <input
          css={css`
            margin: 0.25rem;
            padding: 0.25rem;
            font-size: 0.625rem;
            height: 1.25rem;
            text-align: right;
            width: 4rem;
          `}
          value={amount}
          onChange={e => setRaiseAmount(e.target.value)}
        />

        <RCSlider
          onChange={e => setRaiseAmount(Math.round(e / 1000) * 1000)}
          min={amount}
          max={players[userSeat].chips + players[userSeat].betAmount}
        />
      </div>
    </div>
  );
};

export default Slider;
