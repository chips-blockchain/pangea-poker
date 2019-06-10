import React from "react";
import DealerButton from "./dealer.svg";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Dealer = props => {
  return (
    <img
      src={DealerButton}
      css={css`
        position: absolute;
        ${props.dealer === "player-1" && "top: 10rem; right: 18rem;"}
        ${props.dealer === "player-2" && "top: 12.5rem; right: 11.5rem;"}
        ${props.dealer === "player-3" && "bottom: 15rem; right: 11.5rem;"}
        ${props.dealer === "player-4" && "bottom: 11.5rem; right: 15.5rem;"};
        ${props.dealer === "player-5" && "bottom: 11.5rem; right: 20rem;"};
        ${props.dealer === "player-6" && "bottom: 11.5rem; left: 15.5rem"};
        ${props.dealer === "player-7" && "bottom: 15rem; left: 11.5rem;"};
        ${props.dealer === "player-8" && "top: 12.5rem; left: 11.5rem;"};
        ${props.dealer === "player-9" && "top: 10rem; left: 15rem;"};
        transition: all 0.5s ease-out;
      `}
    />
  );
};

export default Dealer;
