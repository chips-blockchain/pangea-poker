import { css } from "@emotion/core";
import "./svg-sprite.css";

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
