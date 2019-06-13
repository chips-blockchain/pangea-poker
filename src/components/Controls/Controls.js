import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Button from "./Button";

const Controls = props => {
  const [toCall, setToCall] = useState("1000000");
  const [toRaise, setToRaise] = useState("2000000");

  return (
    <div
      css={css`
        position: absolute;
        bottom: 1.75rem;
        right: 1rem;
      `}
    >
      <div>
        <Button label="1/2 Pot" small />
        <Button label="Pot" small />
        <Button label="Max" small />
      </div>
      <Button label="Fold" />
      <Button label="Call" amount={toCall} />
      <Button label="Raise" amount={toRaise} />
    </div>
  );
};

export default Controls;
