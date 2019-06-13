import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Button from "./Button";
import Slider from "./Slider";

const Controls = props => {
  const [toCall, setToCall] = useState(13980);
  const [toRaise, setToRaise] = useState(22711);

  return (
    <div
      css={css`
        position: absolute;
        bottom: 1.75rem;
        right: 1rem;
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 3fr;
        `}
      >
        <Button label="1/2 Pot" small />
        <Button label="Pot" small />
        <Button label="Max" small />
        <Slider toRaise={toRaise} setToRaise={setToRaise} />
      </div>
      <Button label="Fold" />
      <Button label="Call" amount={toCall} />
      <Button
        label={`${toRaise === 108942 ? "All-In" : "Raise"}`}
        amount={toRaise}
      />
    </div>
  );
};

export default Controls;
