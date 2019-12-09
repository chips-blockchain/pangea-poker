import { css } from "@emotion/core";
import { useState, useContext, useEffect } from "react";
import Button from "./Button";
import Slider from "./Slider";
import { DispatchContext, StateContext } from "../../store/context";
import playerStringToId from "../../lib/playerStringToId";
import {
  bet,
  fold,
  log,
  sendMessage,
  setLastAction,
  showControls
} from "../../store/actions";
import { IState } from "../../store/initialState";
import { IMessage } from "../Game/onMessage";
import { Possibilities } from "../../lib/constants";

// This component displays all the controls (buttons and slider) at the bottom left
// when the player is active

const Controls: React.FunctionComponent = () => {
  const dispatch: Function = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const {
    controls,
    lastMessage,
    minRaiseTo,
    players,
    toCall,
    totalPot,
    userSeat
  } = state;

  const { canCheck, canRaise } = controls;

  const betAmount = players[userSeat].betAmount;

  const [raiseAmount, setRaiseAmount] = useState(minRaiseTo);

  const chips: number = players[userSeat].chips;
  const totalStack: number = betAmount + chips;
  const callAmount: number = toCall <= totalStack ? toCall - betAmount : chips;
  const [showFirstRow, setShowFirstRow] = useState(true);

  useEffect(() => {
    if (raiseAmount > totalStack) {
      setRaiseAmount(totalStack);
    }
  }, [raiseAmount]);

  // Hide the top row if incremental raise is not possible
  useEffect(() => {
    if (toCall >= totalStack) {
      setShowFirstRow(false);
    } else if (minRaiseTo >= totalStack) {
      setShowFirstRow(false);
    } else setShowFirstRow(true);
  }, [controls.showControls]);

  const handleButtonClick = (
    action: number,
    player: string,
    amount: number,
    lastAction: string
  ) => {
    // Update the previous message with the new data and send it
    let nextAction: IMessage = lastMessage;
    nextAction.playerid = playerStringToId(player);

    // Check
    if (amount === 0) {
      log(`${player} checks`, "info");
      // Call
    } else if (amount + betAmount === toCall) {
      nextAction.bet_amount = amount + betAmount;
      bet(player, amount + betAmount, state, dispatch);
      log(`${player} calls ${amount}`, "info");
      // Raise
    } else if (amount > toCall) {
      nextAction.bet_amount = amount;
      bet(player, amount, state, dispatch);
      log(
        `${player} raises to ${amount} ${lastAction === "ALL-IN" &&
          " and is All-in"}`,
        "info"
      );
      // Fold
    } else if (action === Possibilities.fold) {
      fold(player, dispatch);
      log(`${player} folds`, "info");
    } else throw new Error("Something is wrong with the betamount.");
    // Hide Controls
    showControls(false, dispatch);
    // Update the player's name with the last action
    setLastAction(nextAction.playerid, lastAction, dispatch);
    // Send the message to the back-end
    nextAction.possibilities = [action];
    sendMessage(nextAction, userSeat, state, dispatch);
  };

  const handleSmallButtonClick = (buttonType: string) => {
    // 1/2 Pot Button
    if (buttonType === "halfPot") {
      const halfPotRaise = toCall + totalPot + betAmount;
      const raiseToSet = halfPotRaise > totalStack ? totalStack : halfPotRaise;
      setRaiseAmount(raiseToSet);
    }
    // Pot Button
    else if (buttonType === "pot") {
      const potRaise = toCall + totalPot + betAmount;
      const raiseToSet = potRaise > totalStack ? totalStack : potRaise;
      setRaiseAmount(raiseToSet);
    }
    // Max button
    else if (buttonType === "max") {
      setRaiseAmount(totalStack);
    } else throw new Error("No such small  button type.");
  };

  return (
    <div
      css={css`
        position: absolute;
        bottom: 1.75rem;
        right: 1rem;
      `}
    >
      {showFirstRow && (
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 3fr;
          `}
        >
          <Button
            label="1/2 Pot"
            small
            onClick={() => handleSmallButtonClick("halfPot")}
            data-test="table-controls-half-pot-button"
          />
          <Button
            label="Pot"
            small
            onClick={() => handleSmallButtonClick("pot")}
            data-test="table-controls-pot-button"
          />
          <Button
            label="Max"
            small
            onClick={() => handleSmallButtonClick("max")}
            data-test="table-controls-max-button"
          />
          <Slider raiseAmount={raiseAmount} setRaiseAmount={setRaiseAmount} />
        </div>
      )}
      {/* Fold Button */}
      <Button
        label="Fold"
        onClick={() =>
          handleButtonClick(Possibilities.fold, userSeat, null, "FOLD")
        }
        data-test="table-controls-fold-button"
      />
      {/* Check/Call Button */}
      <Button
        label={canCheck ? "Check" : "Call"}
        amount={!canCheck && callAmount}
        onClick={() =>
          canCheck
            ? handleButtonClick(
                Possibilities.check,
                userSeat,
                callAmount,
                "CHECK"
              )
            : handleButtonClick(
                Possibilities.call,
                userSeat,
                callAmount,
                "CALL"
              )
        }
        data-test="table-controls-check/call-button"
      />
      {/* Raise/All-In Button */}
      {canRaise && (
        <Button
          label={
            raiseAmount >= chips ? "All-In" : toCall === 0 ? "Bet" : "Raise to"
          }
          amount={
            minRaiseTo >= chips || toCall >= chips ? totalStack : raiseAmount
          }
          onClick={() =>
            minRaiseTo >= chips || toCall >= chips
              ? handleButtonClick(
                  Possibilities.allIn,
                  userSeat,
                  totalStack,
                  "ALL-IN"
                )
              : handleButtonClick(
                  Possibilities.raise,
                  userSeat,
                  raiseAmount,
                  "RAISE"
                )
          }
          data-test="table-controls-raise-button"
        />
      )}
    </div>
  );
};

export default Controls;
