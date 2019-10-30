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
  setMinRaiseTo,
  setToCall,
  setLastAction,
  showControls
} from "../../store/actions";
import { IState } from "../../store/initialState";
import { IMessage } from "../../store/actions";
import { getConsoleOutput } from "@jest/console";

// This component displays all the controls (buttons and slider) at the bottom left
// when the player is active

const Controls: React.FunctionComponent = () => {
  const dispatch: Function = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const {
    lastMessage,
    minRaiseTo,
    players,
    toCall,
    totalPot,
    userSeat
  } = state;

  const betAmount = players[userSeat].betAmount;

  const [raiseAmount, setRaiseAmount] = useState(minRaiseTo);
  const canCheck: boolean = toCall - betAmount === 0;
  const callAmount: number = toCall - betAmount;
  const chips: number = players[userSeat].chips;
  const totalChips: number = betAmount + chips;

  useEffect(() => {
    if (raiseAmount > totalChips) {
      setRaiseAmount(totalChips);
    }
  }, [raiseAmount]);

  // The back-end uses these numbers to interpret player actions
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
      log(`${player} calls ${amount}`, "info");
      bet(player, amount + betAmount, state, dispatch);
      // Raise
    } else if (amount > toCall) {
      log(
        `${player} raises to ${amount} ${lastAction === "ALL-IN" &&
          " and is All-in"}`,
        "info"
      );
      nextAction.bet_amount = amount;
      bet(player, amount, state, dispatch);
      // Fold
    } else if (action === 7) {
      fold(player, dispatch);
      log(`${player} folds`, "info");
    } else throw new Error("Something is wrong with the betamount.");
    // Hide Controls
    showControls(false, dispatch);
    // Update the player's name with the last action
    console.log(lastAction);
    setLastAction(nextAction.playerid, lastAction, dispatch);
    // Send the message to the back-end
    nextAction.possibilities = [action];
    sendMessage(nextAction, userSeat, state, dispatch);
  };

  const handleSmallButtonClick = (buttonType: string) => {
    // 1/2 Pot Button
    if (buttonType === "halfPot") {
      const halfPotRaise = toCall + totalPot + betAmount;
      const raiseToSet = halfPotRaise > totalChips ? totalChips : halfPotRaise;
      setRaiseAmount(raiseToSet);
    }
    // Pot Button
    else if (buttonType === "pot") {
      const potRaise = toCall + totalPot + betAmount;
      const raiseToSet = potRaise > totalChips ? totalChips : potRaise;
      setRaiseAmount(raiseToSet);
    }
    // Max button
    else if (buttonType === "max") {
      setRaiseAmount(totalChips);
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
        />
        <Button
          label="Pot"
          small
          onClick={() => handleSmallButtonClick("pot")}
        />
        <Button
          label="Max"
          small
          onClick={() => handleSmallButtonClick("max")}
        />
        <Slider raiseAmount={raiseAmount} setRaiseAmount={setRaiseAmount} />
      </div>
      {/* Fold Button */}
      <Button
        label="Fold"
        onClick={() => handleButtonClick(7, userSeat, null, "FOLD")}
      />
      {/* Check/Call Button */}
      <Button
        label={canCheck ? "Check" : "Call"}
        amount={!canCheck && callAmount}
        onClick={() =>
          canCheck
            ? handleButtonClick(3, userSeat, callAmount, "CHECK")
            : handleButtonClick(5, userSeat, callAmount, "CALL")
        }
      />
      {/* Raise/All-In Button */}
      {toCall < chips && (
        <Button
          label={
            raiseAmount >= chips ? "All-In" : toCall === 0 ? "Bet" : "Raise to"
          }
          amount={
            minRaiseTo >= chips || toCall >= chips ? totalChips : raiseAmount
          }
          // Need to create an isAllIn Hook and evaluate based on that
          onClick={() =>
            minRaiseTo >= chips || toCall >= chips
              ? handleButtonClick(6, userSeat, totalChips, "ALL-IN")
              : handleButtonClick(4, userSeat, raiseAmount, "RAISE")
          }
        />
      )}
    </div>
  );
};

export default Controls;
