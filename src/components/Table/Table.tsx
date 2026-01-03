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
import FindTableButton from "../FindTableButton";
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
    blinds,
    playerInitState,
    boardCards,
    chipsCollected,
    controls,
    currentChipsStack,
    dealer,
    dealerId,
    gameType,
    gameTurn,
    handHistory,
    isDeveloperMode,
    isLogBox,
    maxPlayers,
    nodeType,
    occupiedSeats,
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
          {/* Show joining message while backend processes join */}
          {!state.isStartupModal && nodeType === "player" && !backendStatus && (
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
              !state.isStartupModal && !backendStatus && nodeType === "player"
            }
          >
            <Connections />
            
            {/* Persistent Wallet Info - Always visible */}
            {nodeType === "player" && state.depositAddress && balance > 0 && (
              <div style={{
                position: "absolute",
                top: "1.5rem",
                right: "0.5rem",
                background: "var(--color-background)",
                color: "var(--color-text)",
                padding: "0.5rem 0.75rem",
                borderRadius: "2px",
                fontSize: "var(--font-size-xs)",
                zIndex: 4,
                border: "1px solid var(--color-primary)",
                fontFamily: "var(--font-family-secondary)"
              }}>
                <div style={{ 
                  marginBottom: "0.5rem", 
                  fontSize: "var(--font-size-xs)",
                  fontWeight: "bold",
                  color: "var(--color-accent)"
                }}>
                  {balance.toFixed(4)} CHIPS
                </div>
                <div style={{ 
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <span style={{ 
                    fontSize: "var(--font-size-xxs)", 
                    color: "var(--color-primaryLight)",
                    wordBreak: "break-all"
                  }}>
                    {state.depositAddress}
                  </span>
                  <span 
                    style={{ 
                      cursor: "pointer",
                      color: "var(--color-primaryLight)",
                      transition: "color 0.1s ease",
                      flexShrink: 0
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(state.depositAddress);
                      console.log("Address copied!");
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--color-accent)"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--color-primaryLight)"}
                    title="Copy address"
                  >
                    ⧉
                  </span>
                </div>
              </div>
            )}
            
            {/* Table Info Panel - Top Left */}
            {nodeType === "player" && state.tableInfoReceived && (
              <div style={{
                position: "absolute",
                top: "0.5rem",
                left: "0.5rem",
                background: "var(--color-background)",
                padding: "0.5rem 0.75rem",
                borderRadius: "2px",
                fontSize: "var(--font-size-xs)",
                zIndex: 4,
                border: "1px solid var(--color-primary)",
                fontFamily: "var(--font-family-secondary)",
                minWidth: "10rem"
              }}>
                <div style={{ 
                  marginBottom: "0.25rem",
                  color: "var(--color-text)",
                  fontSize: "var(--font-size-xs)"
                }}>
                  Table: <span style={{ color: "var(--color-primaryLight)" }}>{tableId || "-"}</span>
                </div>
                <div style={{ 
                  marginBottom: "0.25rem",
                  color: "var(--color-text)",
                  fontSize: "var(--font-size-xs)"
                }}>
                  Dealer: <span style={{ color: "var(--color-primaryLight)" }}>{dealerId || "-"}</span>
                </div>
                <div style={{ 
                  marginBottom: "0.25rem",
                  color: "var(--color-text)",
                  fontSize: "var(--font-size-xs)"
                }}>
                  Players: <span style={{ color: "var(--color-primaryLight)" }}>{occupiedSeats?.length || 0}/{maxPlayers || "-"}</span>
                </div>
                <div style={{ 
                  marginBottom: "0.25rem",
                  color: "var(--color-text)",
                  fontSize: "var(--font-size-xs)"
                }}>
                  Stake: <span style={{ color: "var(--color-primaryLight)" }}>{currentChipsStack || "-"} CHIPS</span>
                </div>
                <div style={{ 
                  color: "var(--color-text)",
                  fontSize: "var(--font-size-xs)"
                }}>
                  Blinds: <span style={{ color: "var(--color-accent)" }}>{blinds?.[0] || "-"}/{blinds?.[1] || "-"}</span>
                </div>
              </div>
            )}
            <TableWrapper>
              
              {/* Find Table Button - Show when backend ready but table_info not yet received */}
              {nodeType === "player" && 
               backendStatus === 1 && 
               !state.tableInfoReceived &&
               !state.isStartupModal && (
                <FindTableButton state={state} dispatch={dispatch} />
              )}
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
