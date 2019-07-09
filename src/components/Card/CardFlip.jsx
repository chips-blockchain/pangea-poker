import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Card from "./Card";
import cardBg from "./cards/bg-red.svg";

const CardFlip = ({ card, dealt }) => {
  return (
    <div
      ontouchstart="this.classList.toggle('hover');"
      css={css`
        display: inline-block;
        height: 4.375rem;
        perspective: 1000px;
        width: 3.125rem;
        ${!dealt &&
          `{
          transform: rotateY(180deg);
          opacity: 0;
          & > div {
            transform: rotateY(180deg);
          }
        }`}
      `}
    >
      {/* flipper */}
      <div
        css={css`
          transform-style: preserve-3d;
          transition: 0.6s;
          position: relative;
        `}
      >
        {/* front */}
        <div
          css={css`
            backface-visibility: hidden;
            height: 4.375rem;
            left: 0;
            position: absolute;
            transform: rotateY(0deg);
            top: 0;
            width: 3.125rem;
            z-index: 2;
          `}
        >
          <Card card={card} />
        </div>
        {/* back */}
        <div
          css={css`
            backface-visibility: hidden;
            height: 4.375rem;
            left: 0;
            position: absolute;
            top: 0;
            transform: rotateY(180deg);
            width: 3.125rem;
          `}
        >
          <img src={cardBg} />
        </div>
      </div>
    </div>
  );
};

export default CardFlip;
