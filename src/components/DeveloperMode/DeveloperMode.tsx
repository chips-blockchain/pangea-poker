import { css } from "@emotion/core";
import { useContext } from "react";
import { Button } from "../Controls";
import {
  devStart,
  dealCards,
  nextTurn,
  setActivePlayer,
  setUserSeat,
  showControls,
  sendMessage
} from "../../store/actions";
import { DispatchContext, StateContext } from "../../store/context";
import { IState } from "../../store/initialState";

const DeveloperMode: React.FunctionComponent = () => {
  const dispatch: Function = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const { activePlayer } = state;

  const nextPlayer = () => {
    const nextPlayer: string =
      activePlayer === "player1" ? "player2" : "player1";
    setUserSeat(nextPlayer, dispatch);
    setActivePlayer(nextPlayer, dispatch);
    showControls(true, dispatch);
  };

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr;
        position: absolute;
        top: 5rem;
        z-index: 999;
      `}
    >
      <Button
        label="Reset"
        onClick={() => {
          sendMessage({ method: "reset" }, "dcv", state, dispatch);
        }}
      />
      <Button label="Pre-Flop" onClick={() => devStart(dispatch)} />
      <Button label="Flop" onClick={() => nextTurn(1, state, dispatch)} />
      <Button label="Turn" onClick={() => nextTurn(2, state, dispatch)} />
      <Button label="River" onClick={() => nextTurn(3, state, dispatch)} />
      <Button label="Next Player" onClick={() => nextPlayer()} />
      <Button
        label="Show Controls"
        onClick={() => showControls(true, dispatch)}
      />
      <Button
        label="Final Info"
        onClick={() => {
          sendMessage(
            {
              method: "finalInfo",
              showInfo: {
                allHoleCardsInfo: [["5D", "3H"], ["2C", "7D"]],
                boardCardInfo: ["9S", "4D", "KD", "5H", "AC"]
              },
              win_amount: 4000000,
              winners: [1]
            },
            "echo",
            state,
            dispatch
          );
        }}
      />
    </div>
  );
};

export default DeveloperMode;
