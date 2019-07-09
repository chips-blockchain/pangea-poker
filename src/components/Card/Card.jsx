import React from "react";
import "./svg-sprite.css";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Card = ({ card }) => {
  return (
    <div
      className={`card card-${card} card-${card}-dims`}
      css={css`
        display: inline-block;
        margin-right: 0.125rem;
      `}
    />
  );
};

export default Card;
