import { useReducer, useEffect, useState } from "react";
import diff from "deep-diff";
import reducer from "../../store/reducer";
import { StateContext, DispatchContext } from "../../store/context";
import initialState, { IPlayer, IState } from "../../store/initialState";
import { sendMessage, updateStateValue } from "../../store/actions";
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
import { TableContainer, TableWrapper, Notice } from "./assets/style";
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
    notice,
    tableId
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
          {/* Show table info overlay when ready to join but before joining */}
          {!state.isStartupModal && nodeType === "player" && !backendStatus && !state.joinApprovalSent && state.balance > 0 && state.tableId && (
            <div style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
              padding: "20px 30px",
              borderRadius: "10px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
              zIndex: 10000,
              color: "white",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>
                {state.tableId}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Dealer: {state.dealerId} | Balance: {state.balance.toFixed(4)} CHIPS | Buy-in: {state.currentChipsStack} CHIPS
              </div>
              <div style={{ fontSize: "13px", marginTop: "10px", opacity: 0.8, fontStyle: "italic" }}>
                ☝️ Click on an empty seat to join
              </div>
            </div>
          )}
          {!state.isStartupModal && nodeType === "player" && !backendStatus && state.joinApprovalSent && (
            <div style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
              padding: "30px 40px",
              borderRadius: "15px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
              zIndex: 10000,
              color: "white",
              textAlign: "center",
              minWidth: "350px"
            }}>
              <div style={{ fontSize: "20px", marginBottom: "15px" }}>
                ⏳ Joining Table...
              </div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>
                Processing payin transaction and initializing deck
              </div>
            </div>
          )}
          <TableContainer
            overlay={
              !state.isStartupModal && !backendStatus && nodeType === "player" && state.joinApprovalSent
            }
          >
            <Connections />
            
            {/* Persistent Wallet Info - Always visible */}
            {nodeType === "player" && state.depositAddress && balance > 0 && (
              <div style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "linear-gradient(135deg, rgba(26, 35, 126, 0.95) 0%, rgba(40, 53, 147, 0.95) 100%)",
                color: "white",
                padding: "15px 20px",
                borderRadius: "10px",
                fontSize: "14px",
                zIndex: 9999,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                minWidth: "220px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div style={{ 
                  marginBottom: "8px", 
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#4CAF50"
                }}>
                  {balance.toFixed(4)} CHIPS
                </div>
                <div style={{ 
                  fontSize: "11px", 
                  cursor: "pointer",
                  padding: "5px 8px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "5px",
                  transition: "background 0.3s ease"
                }}
                  onClick={() => {
                    navigator.clipboard.writeText(state.depositAddress);
                    console.log("Address copied!");
                    alert("Address copied to clipboard!");
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                  title="Click to copy full address"
                >
                  📋 {state.depositAddress.slice(0, 10)}...{state.depositAddress.slice(-8)}
                </div>
              </div>
            )}
            
            <div id="gameType">{gameType}</div>
            {tableId && <div id="tableId">Table: {tableId}</div>}
            {gameType != "" && <div id="balanceGame">Balance: {balance}</div>}
            <TableWrapper>
              {options.showPotCounter && (
                <TotalPot state={state} dispatch={dispatch} />
              )}
              <Board boardCards={boardCards} gameTurn={gameTurn} />
              <PlayerGrid9Max>
                {nodeType === "player" &&
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
