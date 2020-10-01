import React, { useReducer, useEffect, useState } from "react";
import diff from "deep-diff";
import reducer from "../../store/reducer";
import { StateContext, DispatchContext } from "../../store/context";
import initialState from "../../store/initialState";
import { IPlayer, IState } from "../../store/types";
import Backgrounds from "./Backgrounds";
import { PlayerGrid9Max } from "../PlayerGrid";
import Player from "../Player";
import Board from "../Board";
import Dealer from "../Dealer";
import TotalPot from "./TotalPot";
import { ChipGrid, Bet } from "../Chips";
import Controls, { Button } from "../Controls";
import MainPot from "./MainPot";
import Game from "../Game";
import Connections from "./Connections";
import { StartupModal } from "../Modal";
import DeveloperMode from "../DeveloperMode";
import LogBox from "../LogBox";
import Cashier from "../Cashier";
import { TableContainer, TableWrapper, Notice } from "./assets/style";
import "./assets/style.css";
import notifications from "../../config/notifications.json";
import { Conn, NodeType } from "../../lib/constants";
import { isDealer, isPlayer } from "../../lib/helper";
import { closeStartupModal, game, sendMessage } from "../../store/actions";
import { DealerContainer, GameWrapper } from "../Game/assets/style";

// This is the current Main component

const Table: React.FunctionComponent = () => {
  const [previousState, setPreviousState] = useState();
  const [state, dispatch]: [IState, Function] = useReducer(
    reducer,
    initialState
  );
  const {
    activePlayer,
    balance,
    backendStatus,
    boardCards,
    chipsCollected,
    connectionStatus,
    controls,
    dealer,
    gameType,
    gameTurn,
    gameStarted,
    handHistory,
    isDeveloperMode,
    isLogBox,
    isStartupModal,
    nodeType,
    players,
    pot,
    options,
    showMainPot,
    showDealer,
    winner,
    userSeat,
    notice
  } = state;

  const startGame = () => (): void => {
    sendMessage({ method: "game" }, "dcv", state, dispatch);
  };

  const resetGame = () => (): void => {
    sendMessage({ method: "reset" }, "dcv", state, dispatch);
  };

  useEffect(() => {
    if (connectionStatus.status === Conn.connected && isStartupModal) {
      closeStartupModal(dispatch);
      if (
        !isDealer(nodeType) &&
        !gameStarted
      ) {
        return game({ gametype: "", pot: [0] }, state, dispatch);
      }
    }
  }, [state]);
  // For debugging purposes log the difference betweeen the last and current state
  useEffect(() => {
    const difference = diff(previousState, state);
    difference && difference.push(state);
    console.log(difference);
    setPreviousState(state);
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Game />
        {isDeveloperMode && <DeveloperMode />}
        <GameWrapper>
          {isDealer(nodeType) && (
            <DealerContainer>
              <Button label="Start" onClick={startGame()} />
              <Button label="Reset" onClick={resetGame()} />
            </DealerContainer>
          )}
        </GameWrapper>

        <div id="overlayBg">
          {!state.isStartupModal && isPlayer(nodeType) && !backendStatus && (
            <div id="information">{notifications.MINING_TX}</div>
          )}
          <TableContainer
            overlay={
              !state.isStartupModal && !backendStatus && isPlayer(nodeType)
            }
          >
            <Connections />
            <div id="gameType">{gameType}</div>
            {gameType != "" && <div id="balanceGame">Balance: {balance}</div>}
            <TableWrapper>
              {options.showPotCounter && (
                <TotalPot state={state} dispatch={dispatch} />
              )}
              <Board boardCards={boardCards} gameTurn={gameTurn} />
              <PlayerGrid9Max>
                {isPlayer(nodeType) &&
                  Object.values(players).map((player: IPlayer) => (
                    <Player
                      chips={player.chips}
                      connected={player.connected}
                      hasCards={player.hasCards}
                      isActive={activePlayer && activePlayer == player.seat}
                      playerCards={player.playerCards}
                      players={players}
                      seat={player.seat}
                      showCards={player.showCards}
                      key={player.seat}
                      winner={winner}
                    />
                  ))}
                )
              </PlayerGrid9Max>
              <ChipGrid chipsCollected={chipsCollected}>
                {Object.values(players).map(
                  (player: IPlayer) =>
                    player.isBetting && (
                      <Bet
                        betAmount={player.betAmount}
                        forPlayer={player.seat}
                        chipsCollected={chipsCollected}
                        playerBet
                        key={player.seat}
                      />
                    )
                )}
              </ChipGrid>
              {showMainPot && pot[0] !== 0 && (
                <MainPot
                  pot={pot}
                  gameTurn={state.gameTurn}
                  winners={state.winners}
                />
              )}
              {showDealer && <Dealer dealer={`player${dealer + 1}`} />}
              {isLogBox && <LogBox handHistory={handHistory} />}
              {!state.isStartupModal && isPlayer(nodeType) && (
                <Notice level={notice.level}>{notice.text}</Notice>
              )}
              {controls.showControls && (
                <div>
                  <Controls />
                </div>
              )}
            </TableWrapper>

            <Cashier dispatch={dispatch} isOpen={true} state={state} />
            <Backgrounds />
          </TableContainer>
        </div>
        <StartupModal
          dispatch={dispatch}
          isOpen={state.isStartupModal}
          state={state}
        />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
export default Table;
export { DispatchContext, StateContext };
