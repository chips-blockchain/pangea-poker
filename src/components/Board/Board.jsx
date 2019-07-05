import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Card from "../Card";

const Board = ({ boardCards }) => {
  return (
    <div
      css={css`
        height: 4.25rem;
        position: absolute;
        top: 13.75rem;
        left: 17rem;
      `}
    >
      <Card card={boardCards[0]} />
      <Card card={boardCards[1]} />
      <Card card={boardCards[2]} />
      <Card card={boardCards[3]} />
      <Card card={boardCards[4]} />
    </div>
  );
};

export default Board;
