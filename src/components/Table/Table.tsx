import "./assets/style.css";

import { Bet, ChipGrid } from "../Chips";
import { Conn, Node } from "../../lib/constants";
import Controls, { Button } from "../Controls";
import { DealerContainer, GameWrapper } from "../Game/assets/style";
import { DispatchContext, StateContext } from "../../store/context";
import { IPlayer, IState } from "../../store/types";
import { Notice, TableContainer, TableWrapper } from "./assets/style";
import React, { useContext, useEffect, useState } from "react";
import { closeStartupModal, game, sendMessage } from "../../store/actions";
import { isDealer, isPlayer } from "../../lib/helper";

import AutomaticOptions from "../Controls/Options/AutomaticOptions";
import Backgrounds from "./Backgrounds";
import Board from "../Board";
import Cashier from "../Cashier";
import Dealer from "../Dealer";
import DeveloperMode from "../DeveloperMode";
import Game from "../Game";
import LogBox from "../LogBox";
import MainPot from "./MainPot";
import Player from "../Player";
import { PlayerGrid9Max } from "../PlayerGrid";
import { StartupModal } from "../Modal";
import TotalPot from "./TotalPot";
import diff from "deep-diff";
import notifications from "../../config/notifications.json";

// This is the current Main component

const Table: React.FunctionComponent = () => {
  const [previousState, setPreviousState] = useState();
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
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
    notice
  } = state;

  const startGame = () => (): void => {
    sendMessage({ method: "game" }, state, dispatch, Node.dcv);
  };

  const resetGame = () => (): void => {
    sendMessage({ method: "reset" }, state, dispatch, Node.dcv);
  };

  useEffect(() => {
    if (connectionStatus.status === Conn.connected && isStartupModal) {
      closeStartupModal(dispatch);
      if (!isDealer(nodeType) && !gameStarted) {
        game({ gametype: "", pot: [0] }, state, dispatch);
      }
    }
  }, [connectionStatus]);
  // For debugging purposes log the difference betweeen the last and current state
  useEffect(() => {
    if (process.env.NODE_ENV !== "test") {
      const difference = diff(previousState, state);
      difference && difference.push(state);
      if (difference) {
        console.log(difference);
      }
      setPreviousState(state);
    }
  }, [state]);

  return (
    <div>
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
          {/* <Connections /> */}
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
            {(state.gameOptions.sitout ||
              (state.userSeat &&
                !controls.showControls &&
                !state.isShowDown)) && <AutomaticOptions />}
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
    </div>
  );
};
export default Table;
export { DispatchContext, StateContext };
