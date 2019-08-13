import { css } from "@emotion/core";
import "./chips-svg-sprite.css";

// This component renders a single chip.

interface IProps {
  chip: string;
  zIndex?: number;
}

const Chip: React.FunctionComponent<IProps> = ({ chip, zIndex }) => {
  return (
    <div
      className={`icon chip-${chip} chip-${chip}-dims`}
      css={css`
        z-index: ${zIndex};
      `}
    />
  );
};

export default Chip;
