import React, { useState, useReducer } from "react";
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

const initialState = {
  players: {
    player1: {
      isPlaying: true,
      seat: "player1",
      chips: 783900,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 27500
    },
    player2: {
      isPlaying: true,
      seat: "player2",
      chips: 65984,
      hasCards: true,
      showCards: false,
      isBetting: true,
      betAmount: 5249
    },
    player3: {
      isPlaying: true,
      seat: "player3",
      chips: 677854,
      hasCards: true,
      showCards: false,
      isBetting: true,
      betAmount: 13980
    },
    player4: {
      isPlaying: true,
      seat: "player4",
      chips: 900999,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player5: {
      isPlaying: true,
      seat: "player5",
      chips: 108942,
      hasCards: true,
      showCards: true,
      isBetting: false,
      betAmount: 1000000
    },
    player6: {
      isPlaying: true,
      seat: "player6",
      chips: 78400,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player7: {
      isPlaying: true,
      seat: "player7",
      chips: 800800,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player8: {
      isPlaying: true,
      seat: "player8",
      chips: 12000,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    player9: {
      isPlaying: true,
      seat: "player9",
      chips: 650000,
      hasCards: false,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    }
  },
  myCards: ["Ac", "Kc"],
  board: {
    flop: ["Kh", "7c", "8c"],
    turn: "Kd",
    river: "8s"
  },
  pot: 27729,
  dealer: "player1",
  activePlayer: "player5"
};

function reducer(state, action) {
  switch (action.type) {
    case "setActivePlayer": {
      return {
        ...state,
        activePlayer: action.payload
      };
    }

    default:
      throw new Error("Action type is required");
  }
}

const Table = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  return (
    <div
      css={css`
        background-color: ${theme.moon.colors.dark};
        height: 37.5rem;
        width: 50rem;
        position: relative;
      `}
    >
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
            label="LOL"
            onClick={() =>
              dispatch({ type: "setActivePlayer", payload: "player1" })
            }
          >
            LOL
          </button>
        </div>
        <TotalPot pot={state.pot} />
        <Board
          flop={state.board.flop}
          turn={state.board.turn}
          river={state.board.river}
        />
        <PlayerGrid9Max>
          {Object.values(state.players).map(
            player =>
              player.isPlaying && (
                <Player
                  seat={player.seat}
                  hasCards={player.hasCards}
                  chips={player.chips}
                  showCards={player.showCards}
                  myCards={state.myCards}
                  key={player.seat}
                  isActive={state.activePlayer === player.seat}
                  // setPlayers={setPlayers}
                  players={state.players}
                  // setActivePlayer={setActivePlayer}
                />
              )
          )}
        </PlayerGrid9Max>
        <ChipGrid>
          {Object.values(state.players).map(
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
        <Dealer dealer={state.dealer} />
        <div>
          <Controls />
        </div>
      </div>
      <Backgrounds />
    </div>
  );
};
export default Table;
