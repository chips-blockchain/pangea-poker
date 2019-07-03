import React, { useState, useContext } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Button from "./Button";
import Slider from "./Slider";
import { DispatchContext, StateContext } from "../store/context";
import playerStringToId from "../../lib/playerStringToId";
import GameAPI from "../Game/GameAPI";

const Controls = props => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [toCall, setToCall] = useState(state.toCall);
  const [toRaise, setToRaise] = useState(state.toRaise);

  // const allPossibilities = {
  //   0: "",
  //   1: "small_blind",
  //   2: "big_blind",
  //   3: "check",
  //   4: "raise",
  //   5: "call",
  //   6: "allin",
  //   7: "fold"
  // };

  const handleButtonClick = (action, player, betAmount) => {
    let nextAction = state.lastMessage;
    nextAction.playerid = playerStringToId(player);
    nextAction.possibilities = [action];
    if (betAmount) nextAction.betAmount = betAmount;
    GameAPI.sendMessage(nextAction, state.userSeat, state, dispatch);
  };

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
      <Button
        label="Fold"
        onClick={() => handleButtonClick(7, state.userSeat)}
      />
      <Button
        label={toCall === 0 ? "Check" : "Call"}
        amount={toCall !== 0 && toCall}
        onClick={() =>
          toCall === 0
            ? () => handleButtonClick(3, state.userSeat)
            : handleButtonClick(7, state.userSeat, toCall)
        }
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
        onClick={() =>
          toRaise === state.players[state.userSeat].chips ||
          toCall >= state.players[state.userSeat].chips
            ? handleButtonClick(6, state.userSeat)
            : toCall === 0
            ? handleButtonClick(4, state.userSeat)
            : handleButtonClick(4, state.userSeat)
        }
      />
    </div>
  );
};

export default Controls;
