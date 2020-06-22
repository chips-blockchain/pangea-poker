import numberWithCommas from "../../lib/numberWithCommas";
import {
  ButtonStyle,
  ButtonInnerWrapper,
  highlightedButtonStyle
} from "./css/style";
import { css } from "@emotion/core";
// This component renders a Button

interface IProps {
  amount?: number;
  customStyle?: SerializedStyles;
  disabled?: boolean;
  label: string;
  isHighlighted?: boolean;
  isSubmit?: boolean;
  onClick?: React.MouseEventHandler;
  small?: boolean;
  testId?: string;
}

const Button: React.FunctionComponent<IProps> = ({
  amount,
  customStyle,
  disabled,
  label,
  isHighlighted,
  isSubmit,
  onClick,
  small,
  testId
}) => {
  return (
    <ButtonStyle
      css={css`
        ${customStyle}
        ${isHighlighted && highlightedButtonStyle}
      `}
      onClick={onClick}
      data-testid={testId}
      disabled={disabled}
      small={small}
      type={isSubmit ? "submit" : "button"}
    >
      <ButtonInnerWrapper amount={amount}>
        {label} <br />
        {/* Show an amount for the Raise and Call buttons */}
        {amount && numberWithCommas(amount)}
      </ButtonInnerWrapper>
    </ButtonStyle>
  );
};

export default Button;
