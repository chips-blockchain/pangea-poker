import React, { useState, useContext, useEffect } from "react";
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
  const [minRaise, setminRaise] = useState(state.minRaise);

  const betAmount = state.players[state.userSeat].betAmount;

  const [raiseAmount, setRaiseAmount] = useState(minRaise);
  const canCheck = toCall - betAmount === 0;
  const callAmount = toCall - betAmount;
  const chips = state.players[state.userSeat].chips;

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

  const handleButtonClick = (action, player, amount) => {
    // Update the previous message with the new data and send it
    let nextAction = state.lastMessage;
    nextAction.playerid = playerStringToId(player);
    nextAction.possibilities = [action];
    if (amount) {
      // TODO: Fix raise
      nextAction.betAmount = toCall;
      GameAPI.bet(player, betAmount, state, dispatch);
    } else {
      nextAction.betAmount = 0;
      GameAPI.bet(player, betAmount, state, dispatch);
    }
    GameAPI.sendMessage(nextAction, state.userSeat, state, dispatch);
    GameAPI.toggleControls(dispatch);
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
        <Slider state={state} minRaise={minRaise} setminRaise={setminRaise} />
      </div>
      <Button
        label="Fold"
        onClick={() => handleButtonClick(7, state.userSeat)}
      />
      <Button
        label={canCheck ? "Check" : "Call"}
        amount={!canCheck && callAmount}
        onClick={() =>
          canCheck
            ? handleButtonClick(3, state.userSeat, toCall)
            : handleButtonClick(5, state.userSeat, callAmount)
        }
      />
      <Button
        label={
          minRaise >= chips || toCall >= chips
            ? "All-In"
            : toCall === 0
            ? "Bet"
            : "Raise"
        }
        amount={
          minRaise >= chips || toCall >= chips ? chips + betAmount : raiseAmount
        }
        onClick={() =>
          minRaise >= chips || toCall >= chips
            ? handleButtonClick(6, state.userSeat, chips)
            : handleButtonClick(
                4,
                state.userSeat,
                toCall - betAmount + raiseAmount
              )
        }
      />
    </div>
  );
};

export default Controls;
