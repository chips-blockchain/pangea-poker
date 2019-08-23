import { css } from "@emotion/core";
import theme from "../../styles/theme";
import numberWithCommas from "../../lib/numberWithCommas";

// This component renders a Button

interface IProps {
  amount?: number;
  disabled?: boolean;
  label: string;
  onClick?: React.MouseEventHandler;
  small?: boolean;
  testId?: string;
}

const { accent, background, primary, text } = theme.moon.colors;

const Button: React.FunctionComponent<IProps> = ({
  amount,
  disabled,
  label,
  onClick,
  small,
  testId
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      css={css`
        background: ${background};
        border: 0.0625rem solid ${primary};
        border-radius: 0.125rem;
        color: ${text};
        font-size: ${small ? ".75rem" : "1rem"};
        height: ${small ? "1.75rem" : "2.5rem"};
        margin: 0.125rem;
        opacity: ${disabled && "0.5"};
        line-height: 1rem;
        transition: 0.1s ease;
        width: ${small ? "3.625rem" : "7.5rem"};

        ${!disabled &&
          `
        &:hover {
          color: ${accent};
          cursor: pointer;
          border-color: ${accent};
        }
        &:focus {
          border-color: ${accent};
          color: ${accent};
        }
        &:active {
          background: ${accent};
          color: ${background};
        }
        
        `}
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          font-family: "PT Sans", serif;
          text-align: center;
          justify-content: center;
          /* Crop line height */
          ${amount &&
            `
          &:before {
            content: "";
            display: block;
            height: 0;
            width: 0;
            margin-top: 0.75rem;
          }
         
          `}
        `}
      >
        {label} <br />
        {/* Show an amount for the Raise and Call buttons */}
        {amount && numberWithCommas(amount)}
      </div>
    </button>
  );
};

export default Button;
