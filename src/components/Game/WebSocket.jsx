import React, { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { DispatchContext, StateContext } from "../Table";
import pangea from "./pangea";

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
    if (message !== null) {
      if (readyState === 1) {
      }
      console.log(message + " has been sent to " + nodeName);
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

  useEffect(() => {
    if (
      nodeName !== "dcv" &&
      nodeName !== "bvv" &&
      state.connection[nodeName] === "Connected" &&
      state.gameStarted === true &&
      state.players[nodeName].isPlaying === false
    ) {
      dispatch({
        type: "toggleIsPlaying",
        payload: nodeName
      });
    }
  });

  // Parese the received message depending on the node
  useEffect(() => {
    if (lastMessage && nodeName === "dcv") {
      pangea.onMessage(lastMessage.data, state, dispatch);
    } else if (lastMessage) {
      pangea.onMessage_[nodeName](lastMessage.data, state, dispatch);
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
