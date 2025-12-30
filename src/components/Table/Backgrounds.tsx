import React from "react";
import { css } from "@emotion/core";
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
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        `}
        alt="Watching the Earth from the Moon"
      />
      <img
        src={tableDefault}
        css={css`
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        `}
        alt="Poker table with Chips logo at the center"
      />
    </div>
  );
};

export default Backgrounds;
