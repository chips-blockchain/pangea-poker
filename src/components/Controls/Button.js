import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import numberWithCommas from "../../lib/numberWithCommas";

const Button = props => {
  return (
    <button
      onClick={props.onClick}
      css={css`
        background: ${theme.moon.colors.background};
        border: 0.0625rem solid ${theme.moon.colors.primary};
        border-radius: 0.125rem;
        color: ${theme.moon.colors.text};
        font-size: ${props.small ? ".75rem" : "1rem"};
        height: ${props.small ? "1.75rem" : "2.5rem"};
        margin: 0.125rem;
        line-height: 1rem;
        transition: 0.1s ease;
        width: ${props.small ? "3.625rem" : "7.5rem"};

        &:hover {
          color: ${theme.moon.colors.accent};
          cursor: pointer;
          border-color: ${theme.moon.colors.accent};
        }
        &:focus {
          border-color: ${theme.moon.colors.accent};
          color: ${theme.moon.colors.accent};
        }
        &:active {
          background: ${theme.moon.colors.accent};
          color: ${theme.moon.colors.background};
        }
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
          ${props.amount &&
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
        {props.label} <br />
        {props.amount && numberWithCommas(props.amount)}
      </div>
    </button>
  );
};

export default Button;
