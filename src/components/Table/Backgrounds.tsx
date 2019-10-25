import React from "react";
import { css } from "@emotion/core";
import theme from "../../styles/theme";
import moonBg from "./background-moon@2x.jpg";
import moonBg2x from "./background-moon@2x.jpg";
import tableDefault from "./table-default.svg";

const Backgrounds: React.FunctionComponent = () => {
  return (
    <div>
      {/* Background images as srcSet for better responsive support */}
      <img
        srcSet={`${moonBg} 1x, ${moonBg2x} 2x, `}
        css={css`
          position: absolute;
        `}
        alt="Watching the Earth from the Moon"
      />
      <img
        src={tableDefault}
        css={css`
          position: absolute;
          top: 6rem;
          left: 2.875rem;
        `}
        alt="Poker table with Chips logo at the center"
      />
    </div>
  );
};

export default Backgrounds;
