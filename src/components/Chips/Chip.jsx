import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import "./chips-svg-sprite.css";

const Chip = props => {
  return (
    <div
      className={`icon chip-${props.chip} chip-${props.chip}-dims`}
      css={css`
        z-index: ${props.zIndex};
      `}
    />
  );
};

export default Chip;