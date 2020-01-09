import React from "react";
import { css } from "@emotion/core";
import theme from "../../styles/theme";

const Modal: React.FunctionComponent = ({ children }) => {
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 37.5rem;
        width: 50rem;
        z-index: 999;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${theme.moon.colors.background};
          opacity: 0.5;
        `}
      />
      <div
        css={css`
          color: ${theme.moon.colors.text};
          background-color: ${theme.moon.colors.background};
          left: 50%;
          margin: auto;
          transform: translate(-50%, -50%);
          text-align: center;
          top: 50%;
          padding: 2rem 2rem;
          position: absolute;
          right: 0;
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
