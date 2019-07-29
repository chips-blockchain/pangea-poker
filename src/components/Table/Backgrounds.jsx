/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";

const backgrounds = () => {
  return (
    <React.Fragment>
      {/* Background images as srcSet for better responsive support */}
      <img
        srcSet={`
            ${theme.moon.background.regular} 1x,
            ${theme.moon.background.retina} 2x,
        `}
        css={css`
          position: absolute;
        `}
        alt="Watching the Earth from the Moon"
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
        alt="Poker table with Chips logo at the center"
      />
    </React.Fragment>
  );
};

export default backgrounds;
