import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Bet from "../Chips/Bet";

const MainPot = () => {
  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        right: 4rem;
        margin: auto;
        display: flex;
        justify-content: center;
        top: 19rem;
      `}
    >
      <Bet betAmount={8500} />
    </div>
  );
};

export default MainPot;
