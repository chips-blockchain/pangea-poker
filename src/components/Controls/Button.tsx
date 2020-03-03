import { css } from "@emotion/core";
import styled from "@emotion/styled";
import numberWithCommas from "../../lib/numberWithCommas";

// This component renders a Button

interface IProps {
  amount?: number;
  disabled?: boolean;
  label: string;
  isHighlighted?: boolean;
  onClick?: React.MouseEventHandler;
  small?: boolean;
  testId?: string;
}

const Button: React.FunctionComponent<IProps> = ({
  amount,
  disabled,
  label,
  isHighlighted,
  onClick,
  small,
  testId
}) => {
  const ButtonStyle = styled.button`
    background: var(--color-background);
    border: 0.0625rem solid var(--color-primary);
    border-radius: 0.125rem;
    color: var(--color-text);
    font-size: ${small ? ".75rem" : "1rem"};
    font-weight: 700;
    height: ${small ? "1.75rem" : "2.5rem"};
    margin: 0.5rem;
    opacity: ${disabled && "0.5"};
    line-height: 1rem;
    transition: 0.1s ease;
    width: ${small ? "3.625rem" : "7.5rem"};

    ${!disabled &&
      `
&:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  cursor: pointer;
}
&:focus {
  color: var(--color-accent);
  border-color: var(--color-accent);
}
&:active {
  background: var(--color-accent);
  color: var(--color-background);
}

`}
  `;

  const highlightedButtonStyle = css`
    background: var(--color-primaryLight);
    border-color: var(--color-primaryLight);
    color: var(--color-background);

    &:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-background);
    }
    &:active {
      border-color: var(--color-primary);
    }
  `;

  const ButtonInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    font-family: var(--font-family-secondary);
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
  `;
  return (
    <ButtonStyle
      css={isHighlighted && highlightedButtonStyle}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      <ButtonInnerWrapper>
        {label} <br />
        {/* Show an amount for the Raise and Call buttons */}
        {amount && numberWithCommas(amount)}
      </ButtonInnerWrapper>
    </ButtonStyle>
  );
};

export default Button;
