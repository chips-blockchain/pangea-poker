import React, { useState, useContext, useEffect } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import WebSocket from "./WebSocket";
import { DispatchContext, StateContext } from "../store/context";
import { Button } from "../Controls";
import { sendMessage } from "./gameAPI";

// For testing
const SOCKET_URL_ECHO = "wss://echo.websocket.org";

const Game = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const SOCKET_URL_DCV = `ws://${state.nodes.dcv}`;
  const SOCKET_URL_BVV = `ws://${state.nodes.bvv}`;
  const SOCKET_URL_PLAYER1 = `ws://${state.nodes.player1}`;
  const SOCKET_URL_PLAYER2 = `ws://${state.nodes.player2}`;

  const [webSocketKeys, setWebSocketKeys] = useState({
    dcv: 1,
    bvv: 2,
    player1: 3,
    player2: 4
  });

  const [reconnect, setReconnect] = useState(0);

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
          top: 4;
        `}
      >
        {state.gameStarted === false && (
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              grid-template-rows: 1fr 1fr 1fr;
            `}
          >
            <Button
              label="Start"
              onClick={() => {
                sendMessage({ method: "game" }, "dcv", state, dispatch);
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
        server={SOCKET_URL_DCV}
        message={state.message.dcv}
        key={webSocketKeys.dcv}
      />
      <WebSocket
        nodeName="bvv"
        server={SOCKET_URL_BVV}
        message={state.message.bvv}
        key={webSocketKeys.bvv}
      />
      <WebSocket
        nodeName="player1"
        server={SOCKET_URL_PLAYER1}
        message={state.message.player1}
        key={webSocketKeys.player1}
      />
      <WebSocket
        nodeName="player2"
        server={SOCKET_URL_PLAYER2}
        message={state.message.player2}
        key={webSocketKeys.player2}
      />
    </div>
  );
};

export default Game;
