import React, { useState, useContext, useEffect } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import WebSocket from "./WebSocket";
import { DispatchContext, StateContext } from "../store/context";
import { Button } from "../Controls";
import {
  bet,
  collectChips,
  dealCards,
  sendMessage,
  setActivePlayer,
  setLastAction,
  updateGameTurn,
  resetTurn,
  setUserSeat,
  toggleControls
} from "./gameAPI";

const SOCKET_URL_DCV = "ws://209.250.254.100:9000/";
const SOCKET_URL_BVV = "ws://95.179.192.102:9001/";
const SOCKET_URL_PLAYER1 = "ws://45.77.52.117:9002";
const SOCKET_URL_PLAYER2 = "ws://217.69.0.32:9003";

// For testing
const SOCKET_URL_ECHO = "wss://echo.websocket.org";

const Game = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const [webSocketKeys, setWebSocketKeys] = useState({
    dcv: 1,
    bvv: 2,
    player1: 3,
    player2: 4
  });

  const [reconnect, setReconnect] = useState(0);

  const nextPlayer = () => {
    if (state.activePlayer === "player1") {
      setActivePlayer("player2", dispatch);
      setUserSeat("player2", dispatch);
    } else {
      setActivePlayer("player1", dispatch);
      setUserSeat("player1", dispatch);
    }
    toggleControls(dispatch);
  };

  // TODO: This is not a very elegant solution to refresh the Websocket when they disconenct.
  useEffect(() => {
    Object.keys(webSocketKeys).map(node => {
      state.connection[node] == "Disconnected" &&
        setWebSocketKeys({
          ...webSocketKeys,
          [node]: Math.random()
        });
    });
  }, [reconnect]);

  return (
    <div>
      <div
        css={css`
          position: absolute;
          z-index: 5;
          bottom: -10;
        `}
      >
        {state.gameStarted === false && (
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              grid-template-rows: 1fr 1fr 1fr;
            `}
          >
            {/* sendMessage({ method: "game" }, "dcv", state, dispatch) */}
            <Button
              label="Small Blind"
              onClick={() => {
                bet("player1", 1000000, state, dispatch);
                setActivePlayer("player2", dispatch);
                setLastAction(0, "SMALL BLIND", dispatch);
              }}
            />
            <Button
              label="Big Blind"
              onClick={() => {
                bet("player2", 2000000, state, dispatch);
                setLastAction(1, "BIG BLIND", dispatch);
              }}
            />
            <Button
              label="Deal"
              onClick={() => {
                dealCards(dispatch);
                setLastAction(1, null, dispatch);
                setActivePlayer(null, dispatch);
                setTimeout(() => {
                  setActivePlayer("player1", dispatch);
                  setUserSeat("player1", dispatch);
                  toggleControls(dispatch);
                }, 1000);
              }}
            />
            <Button
              label="Next"
              onClick={() => {
                nextPlayer();
              }}
            />
            <Button
              label="Flop"
              onClick={() => {
                collectChips(state, dispatch);
                setActivePlayer(null, dispatch);
                setTimeout(() => {
                  updateGameTurn(1, dispatch);
                }, 400);
                setTimeout(() => {
                  setActivePlayer("player1", dispatch);
                  setUserSeat("player1", dispatch);
                  resetTurn(dispatch);
                  toggleControls(dispatch);
                }, 1000);
                setLastAction(1, null, dispatch);
              }}
            />
          </div>
        )}
      </div>
      <div
        css={css`
          position: absolute;
          z-index: 5;
          left: 0;
          top: 2.7rem;
        `}
      >
        {reconnect != 0 && (
          <Button
            label="Reconnect"
            onClick={() => setReconnect(Math.random())}
          />
        )}
      </div>
      <WebSocket
        nodeName="dcv"
        server={SOCKET_URL_ECHO}
        message={state.message.dcv}
        key={webSocketKeys.dcv}
      />
      <WebSocket
        nodeName="bvv"
        server={SOCKET_URL_ECHO}
        message={state.message.bvv}
        key={webSocketKeys.bvv}
      />
      <WebSocket
        nodeName="player1"
        server={SOCKET_URL_ECHO}
        message={state.message.player1}
        key={webSocketKeys.player1}
      />
      <WebSocket
        nodeName="player2"
        server={SOCKET_URL_ECHO}
        message={state.message.player2}
        key={webSocketKeys.player2}
      />
    </div>
  );
};

export default Game;
