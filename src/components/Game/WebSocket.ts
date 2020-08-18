/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { DispatchContext, StateContext } from "../../store/context";
import { onMessage, onMessage_player } from "./onMessage";
import { IState } from "../../store/initialState";
import { resetMessage, sendInitMessage, closeStartupModal, updateStateValue, game } from "../../store/actions";

// This component is responsible for the WebSocket connection. It doesn't return and

const STATIC_OPTIONS = {};

interface IProps {
  message: string;
  nodeName: string;
  server: string;
}

const WebSocket = React.memo(({ message, nodeName, server }: IProps) => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const [currentSocketUrl] = useState(server);
  const [sendMessage, lastMessage, readyState] = useWebSocket(
    currentSocketUrl,
    STATIC_OPTIONS
  );

  const readyStateString = {
    0: "Connecting...",
    1: "Connected",
    2: "Disconnecting...",
    3: "Disconnected"
  }[readyState];

  // Send a message if props changes
  useEffect(() => {
    if (message && readyState === 1) {
      sendMessage(message);
      resetMessage(nodeName, dispatch);
    }
  }, [message]);

  // If the connection status changes, update the state
  useEffect(() => {
    if (state.connection[nodeName] !== readyStateString) {
      updateStateValue('connectionStatus', readyStateString, dispatch);
      sendInitMessage(readyStateString, nodeName, dispatch);
      if (readyStateString === 'Connected') {
        // Start the game if it's a player node
        nodeName !== "dealer" && game({ gametype: "", pot: [0] }, state, dispatch);
        closeStartupModal(dispatch);
      }
      if (readyStateString === 'Disconnected') {
        updateStateValue('connectionStatus', 'Could not connect to the node', dispatch); 
        updateStateValue("nodesSet", false, dispatch);
      }
    }
  });

  // Parse the received message depending on the node
  useEffect(() => {
    if (lastMessage) {
      switch (nodeName) {
        case "dcv": {
          onMessage(lastMessage.data, state, dispatch);
          break;
        }
        case "echo": {
          onMessage(lastMessage.data, state, dispatch);
          break;
        }
        default: {
          onMessage_player(lastMessage.data, nodeName, state, dispatch);
        }
      }
    }
  }, [lastMessage]);
});

export default WebSocket;
