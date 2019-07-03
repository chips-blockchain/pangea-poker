import React, { useState, useContext } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Button from "./Button";
import Slider from "./Slider";
import { DispatchContext, StateContext } from "../store/context";

const Controls = props => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [toCall, setToCall] = useState(state.toCall);
  const [toRaise, setToRaise] = useState(state.toRaise);

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
        <Slider state={state} toRaise={toRaise} setToRaise={setToRaise} />
      </div>
      <Button label="Fold" />
      <Button
        label={toCall === 0 ? "Check" : "Call"}
        amount={toCall !== 0 && toCall}
      />
      <Button
        label={
          toRaise === state.players[state.userSeat].chips ||
          toCall >= state.players[state.userSeat].chips
            ? "All-In"
            : toCall === 0
            ? "Bet"
            : "Raise"
        }
        amount={toRaise}
      />
    </div>
  );
};

export default Controls;
