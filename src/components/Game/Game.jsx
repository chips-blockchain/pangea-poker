import React, { useState, useContext, useEffect } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import WebSocket from "./WebSocket";
import { DispatchContext, StateContext } from "../store/context";
import { Button } from "../Controls";
import GameAPI from "./GameAPI";

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
        `}
      >
        {state.gameStarted === false && (
          <Button
            label="Start"
            onClick={() =>
              GameAPI.sendMessage({ method: "game" }, "dcv", state, dispatch)
            }
          />
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
        <Button label="Reconnect" onClick={() => setReconnect(Math.random())} />
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
