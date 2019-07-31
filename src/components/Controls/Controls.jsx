/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useContext, useEffect } from "react";
import Button from "./Button";
import Slider from "./Slider";
import { DispatchContext, StateContext } from "../store/context";
import playerStringToId from "../../lib/playerStringToId";
import {
  bet,
  fold,
  log,
  sendMessage,
  setMinRaise,
  setToCall,
  setLastAction,
  toggleControls
} from "../store/actions";

const Controls = props => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { toCall, lastMessage, minRaise, players, totalPot, userSeat } = state;

  const betAmount = players[userSeat].betAmount;

  const [raiseAmount, setRaiseAmount] = useState(minRaise);
  const canCheck = toCall - betAmount === 0;
  const callAmount = toCall - betAmount;
  const chips = players[userSeat].chips;
  const totalChips = betAmount + chips;

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

  const handleButtonClick = (action, player, amount, lastAction) => {
    // Update the previous message with the new data and send it
    let nextAction = lastMessage;
    nextAction.playerid = playerStringToId(player);

    // Check
    if (amount === 0) {
      log(`${player} checks`, "info");
      // Call
    } else if (amount + betAmount === toCall) {
      log(`${player} calls ${amount}`, "info");
      bet(player, amount + betAmount, state, dispatch);
      // Raise
    } else if (amount + betAmount > toCall) {
      log(`${player} raises to ${amount}`, "info");
      nextAction.bet_amount = amount;
      bet(player, amount, state, dispatch);
      setMinRaise(amount + amount - toCall, dispatch);
      setToCall(amount, dispatch);
      // Fold
    } else if (action === 7) {
      fold(player, dispatch);
      log(`${player} folds`, "info");
    } else throw new Error("Something is wrong with the betamount.");
    // Hide Controls
    toggleControls(dispatch);
    // Update the player's name with the last action
    setLastAction(nextAction.playerid, lastAction, dispatch);
    // Send themessage to the back-end
    nextAction.possibilities = [action];
    sendMessage(nextAction, userSeat, state, dispatch);
  };

  const handleSmallButtonClick = buttonType => {
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
        <Slider
          players={players}
          userSeat={userSeat}
          raiseAmount={raiseAmount}
          setRaiseAmount={setRaiseAmount}
          minRaise={minRaise}
          toCall={toCall}
        />
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
      <Button
        label={
          raiseAmount >= chips || toCall >= chips
            ? "All-In"
            : toCall === 0
            ? "Bet"
            : "Raise to"
        }
        amount={minRaise >= chips || toCall >= chips ? totalChips : raiseAmount}
        onClick={() =>
          minRaise >= chips || toCall >= chips
            ? handleButtonClick(6, userSeat, totalChips, "ALL-IN")
            : handleButtonClick(4, userSeat, raiseAmount, "RAISE")
        }
      />
    </div>
  );
};

export default Controls;
