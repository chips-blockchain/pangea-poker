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
  const { gameStarted, message, nodes } = useContext(StateContext);

  const SOCKET_URL_DCV = `ws://${nodes.dcv}`;
  const SOCKET_URL_BVV = `ws://${nodes.bvv}`;
  const SOCKET_URL_PLAYER1 = `ws://${nodes.player1}`;
  const SOCKET_URL_PLAYER2 = `ws://${nodes.player2}`;

  const [webSocketKey, setWebSocketKey] = useState(0);

  const [reconnect, setReconnect] = useState(0);

  // Rerender the WebSocket components and thus reconnect when the nodes in state get updated
  useEffect(() => {
    setWebSocketKey(Math.random());
  }, [nodes]);

  return (
    <div>
      <div
        css={css`
          position: absolute;
          z-index: 5;
          top: 4;
        `}
      >
        {gameStarted === false && (
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
        message={message.dcv}
        key={webSocketKey + 1}
      />
      <WebSocket
        nodeName="bvv"
        server={SOCKET_URL_BVV}
        message={message.bvv}
        key={webSocketKey + 2}
      />
      <WebSocket
        nodeName="player1"
        server={SOCKET_URL_PLAYER1}
        message={message.player1}
        key={webSocketKey + 3}
      />
      <WebSocket
        nodeName="player2"
        server={SOCKET_URL_PLAYER2}
        message={message.player2}
        key={webSocketKey + 4}
      />
    </div>
  );
};

export default Game;
