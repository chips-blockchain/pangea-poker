import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Bet } from "../Chips";

const MainPot = ({ mainPot, showDown }) => {
  return (
    <div
      css={css`
        position: absolute;
        left: ${showDown ? "25rem" : "0"};
        right: 4rem;
        margin: auto;
        display: flex;
        justify-content: center;
        top: ${showDown ? "9.5rem" : "19rem"};
        transition: 0.5s ease-out;
        transition-delay: 1s;
      `}
    >
      <Bet betAmount={mainPot} />
    </div>
  );
};

export default MainPot;
