/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, useContext } from "react";
import WebSocket from "./WebSocket";
import { DispatchContext, StateContext } from "../Table";
import { Button } from "../Controls";

const SOCKET_URL_DCV = "ws://209.250.254.100:9000/";
const SOCKET_URL_BVV = "ws://217.69.0.32:9001/";
const SOCKET_URL_PLAYER1 = "ws://217.69.0.32:9002";
const SOCKET_URL_PLAYER2 = "ws://45.77.52.117:9003";

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
      <div
        css={css`
          position: absolute;
          z-index: 5;
        `}
      >
        {state.gameStarted === false && (
          <Button
            label="Start"
            onClick={() => {
              if (state.connection.dcv === "Connected") {
                setMessage({
                  ...message,
                  dcv: JSON.stringify({ method: "game" })
                });
              } else alert("Please wait until DCV is connected.");
            }}
          />
        )}
      </div>
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
