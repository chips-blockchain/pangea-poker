import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import numberWithCommas from "../../lib/numberWithCommas";
import theme from "../../styles/theme";

const TotalPot = props => {
  return (
    <div
      css={css`
        color: ${theme.moon.colors.text};
        top: 12rem;
        font-size: 0.75rem;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        text-align: center;
      `}
    >
      Pot: {numberWithCommas(props.pot)}
    </div>
  );
};

export default TotalPot;
