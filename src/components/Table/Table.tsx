import { useReducer, useEffect, useState } from "react";
import diff from "deep-diff";
import reducer from "../../store/reducer";
import { StateContext, DispatchContext } from "../../store/context";
import initialState, { IPlayer, IState } from "../../store/initialState";
import Backgrounds from "./Backgrounds";
import { PlayerGrid9Max } from "../PlayerGrid";
import Player from "../Player";
import Board from "../Board";
import Dealer from "../Dealer";
import TotalPot from "./TotalPot";
import { ChipGrid, Bet } from "../Chips";
import Controls from "../Controls";
import MainPot from "./MainPot";
import Game from "../Game";
import Connections from "./Connections";
import { StartupModal } from "../Modal";
import DeveloperMode from "../DeveloperMode";
import LogBox from "../LogBox";
import Cashier from "../Cashier";
import {
  TableContainer,
  GameTypeWrapper,
  TableWrapper,
  Notice
} from "./assets/style";
import "./assets/style.css";
import notifications from "../../config/notifications.json";

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
    controls,
    dealer,
    gameType,
    gameTurn,
    handHistory,
    isDeveloperMode,
    isLogBox,
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

        <div id="overlayBg">
          {!state.isStartupModal && nodeType === "player" && !backendStatus && (
            <div id="information">{notifications.MINING_TX}</div>
          )}
          <TableContainer overlay={!state.isStartupModal && !backendStatus && nodeType === 'player'}>
            <Connections />
            <div id="gameType">{gameType}</div>
            {gameType != "" && <div id="balanceGame">Balance: {balance}</div>}
            <TableWrapper>
              {options.showPotCounter && (
                <TotalPot state={state} dispatch={dispatch} />
              )}
              <Board boardCards={boardCards} gameTurn={gameTurn} />
              <PlayerGrid9Max>
                {nodeType === "player" &&
                  Object.values(players).map(
                    (player: IPlayer) =>
                      (player.connected || !userSeat) && (
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
                      )
                  )}
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
              {!state.isStartupModal && nodeType === "player" && (
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
