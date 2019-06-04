import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";

const Table = () => {
  return (
    <div
      css={css`
        background-color: ${theme.moon.colors.dark};
        height: 37.5rem;
        width: 50rem;
      `}
    >
      <img
        srcSet={`
            ${theme.moon.background.regular} 1x,
            ${theme.moon.background.retina} 2x,
        `}
        css={css`
          position: absolute;
        `}
        alt=""
      />
      <img
        srcSet={`
            ${theme.moon.table.regular} 1x,
            ${theme.moon.table.retina} 2x,
        `}
        css={css`
          position: absolute;
          top: 6rem;
          left: 2.875rem;
        `}
        alt=""
      />
    </div>
  );
};

export default Table;
