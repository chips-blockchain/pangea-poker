import React from "react";
import "./svg-sprite.css";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Card = props => {
  return (
    <div
      className={`card card-${props.card} card-${props.card}-dims`}
      css={css`
        display: inline-block;
        margin-right: 2px;
      `}
    />
  );
};

export default Card;
