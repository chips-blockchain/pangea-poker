import React, { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { DispatchContext, StateContext } from "../store/context";
import {
  onMessage,
  onMessage_bvv,
  onMessage_player1,
  onMessage_player2
} from "./onMessage";
import { log } from "../store/actions";

const STATIC_OPTIONS = {};
const READY_STATE_OPEN = 1;

const WebSocket = React.memo(({ children, message, nodeName, server }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [currentSocketUrl, setCurrentSocketUrl] = useState(server);
  const [sendMessage, lastMessage, readyState] = useWebSocket(
    currentSocketUrl,
    STATIC_OPTIONS
  );

  // Send a message if props changes
  useEffect(() => {
    if (message && readyState === 1) {
      log(`Sent to ${nodeName}: `, "sent", JSON.parse(message));
      sendMessage(message);
    }
  }, [message]);

  // If the connection status changes, update the state
  useEffect(() => {
    if (state.connection[nodeName] !== readyStateString) {
      dispatch({
        type: "connect",
        payload: { nodeName: nodeName, readyState: readyStateString }
      });
    }
  });

  // Parese the received message depending on the node
  useEffect(() => {
    if (lastMessage) {
      switch (nodeName) {
        case "dcv": {
          onMessage(lastMessage.data, state, dispatch);
          break;
        }
        case "bvv": {
          onMessage_bvv(lastMessage.data, state, dispatch);
          break;
        }
        case "player1": {
          onMessage_player1(lastMessage.data, state, dispatch);
          break;
        }
        case "player2": {
          onMessage_player2(lastMessage.data, state, dispatch);
          break;
        }
        case "echo": {
          onMessage(lastMessage.data, state, dispatch);
        }
      }
    }
  }, [lastMessage]);

  const readyStateString = {
    0: "Connecting...",
    1: "Connected",
    2: "Disconnecting...",
    3: "Disconnected"
  }[readyState];

  return <React.Fragment />;
});

export default WebSocket;
