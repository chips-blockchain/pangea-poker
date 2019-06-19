import React, { useState, useContext } from "react";
import WebSocket from "./WebSocket";
import { DispatchContext, StateContext } from "../Table";

const SOCKET_URL_DCV = "wss://echo.websocket.org";
const SOCKET_URL_BVV = "wss://demos.kaazing.com/echo";
const SOCKET_URL_PLAYER2 = "wss://echo.websocket.org";
const SOCKET_URL_PLAYER1 = "wss://echo.websocket.org";

const Game = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const [message, setMessage] = useState({
    dcv: null,
    bvv: null,
    player1: null,
    player2: null
  });
  return (
    <div>
      <WebSocket nodeName="dcv" server={SOCKET_URL_DCV} message={message.dcv} />
      <WebSocket nodeName="bvv" server={SOCKET_URL_BVV} message={message.bvv} />
      <WebSocket
        nodeName="player1"
        server={SOCKET_URL_PLAYER1}
        message={message.player1}
      />
      <WebSocket
        nodeName="player2"
        server={SOCKET_URL_PLAYER2}
        message={message.player2}
      />
    </div>
  );
};

export default Game;
