import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Card from "../Card";

const Board = props => {
  return (
    <div
      css={css`
        height: 4.25rem;
        position: absolute;
        top: 13.75rem;
        left: 17rem;
      `}
    >
      <Card card={props.flop[0]} />
      <Card card={props.flop[1]} />
      <Card card={props.flop[2]} />
      <Card card={props.turn} />
      <Card card={props.river} />
    </div>
  );
};

export default Board;
