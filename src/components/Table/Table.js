import React, { useReducer, createContext } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import Backgrounds from "./Backgrounds";
import { PlayerGrid9Max } from "../PlayerGrid";
import Player from "../Player";
import Board from "../Board";
import Dealer from "../Dealer";
import TotalPot from "./TotalPot";
import { ChipGrid, Bet } from "../Chips";
import Controls from "../Controls";
import MainPot from "./MainPot";
import initialState from "../store/initialState";
import reducer from "../store/reducer";
import Game from "../Game";
import Connections from "./Connections";

const StateContext = createContext();
const DispatchContext = createContext();

const Table = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { players, myCards, board, pot, dealer, activePlayer } = state;

  console.log(state.connection);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Game />
        <div
          css={css`
            background-color: ${theme.moon.colors.dark};
            height: 37.5rem;
            width: 50rem;
            position: relative;
          `}
        >
          <Connections />
          <div
            css={css`
              position: absolute;
              width: 100%;
              height: 100%;
              z-index: 1;
            `}
          >
            <div
              css={css`
                position: absolute;
              `}
            >
              <button
                label="TEST"
                onClick={() => dispatch({ type: "Fold", payload: "player5" })}
              >
                LOL
              </button>
            </div>
            <TotalPot pot={pot} />
            <Board flop={board.flop} turn={board.turn} river={board.river} />
            <PlayerGrid9Max>
              {Object.values(players).map(
                player =>
                  player.isPlaying && (
                    <Player
                      seat={player.seat}
                      hasCards={player.hasCards}
                      chips={player.chips}
                      showCards={player.showCards}
                      myCards={myCards}
                      key={player.seat}
                      isActive={activePlayer === player.seat}
                      // setPlayers={setPlayers}
                      players={players}
                      // setActivePlayer={setActivePlayer}
                    />
                  )
              )}
            </PlayerGrid9Max>
            <ChipGrid>
              {Object.values(players).map(
                player =>
                  player.isBetting && (
                    <Bet
                      forPlayer={player.seat}
                      betAmount={player.betAmount}
                      key={player.seat}
                    />
                  )
              )}
            </ChipGrid>
            <MainPot />
            <Dealer dealer={dealer} />
            <div>
              <Controls />
            </div>
          </div>
          <Backgrounds />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
export default Table;
export { DispatchContext, StateContext };
