import { css } from "@emotion/core";
import "./svg-sprite.css";

// This is a simple component to render a card using CSS sprite

interface IProps {
  card: string;
}

const Card: React.FunctionComponent<IProps> = ({ card }) => {
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
