/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { DispatchContext, StateContext } from "../../store/context";
import { onMessage } from "./onMessage";
import { IState } from "../../store/types";
import { Conn, Node } from "../../lib/constants";
import {
  resetMessage,
  sendInitMessage,
  updateStateValue,
  updateSocketConnection
} from "../../store/actions";

// This component is responsible for the WebSocket connection. It doesn't return and

const STATIC_OPTIONS = {
  // onOpen: () => console.log('opened')
};

interface IProps {
  message: string;
  nodeName: string;
  server: string;
}

const WebSocket = React.memo(({ message, nodeName, server }: IProps) => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const [currentSocketUrl] = useState(server);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    currentSocketUrl,
    STATIC_OPTIONS
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: Conn.connecting,
    [ReadyState.OPEN]: Conn.connected,
    [ReadyState.CLOSING]: Conn.disconnecting,
    [ReadyState.CLOSED]: Conn.disconnected,
    [ReadyState.UNINSTANTIATED]: Conn.uninstantiated
  }[readyState];

  // Send a message if props changes
  useEffect(() => {
    if (
      message &&
      readyState === ReadyState.OPEN &&
      nodeName === Node.playerWrite
    ) {
      sendJsonMessage(message);
      resetMessage(nodeName, dispatch);
    }
  }, [message]);

  // If the connection status changes, update the state
  useEffect(() => {
    if (!state.connection[nodeName]) {
      sendInitMessage(connectionStatus, nodeName, dispatch);
      return;
    }
    if (state.connection[nodeName] !== connectionStatus) {
      updateSocketConnection(connectionStatus, nodeName, dispatch);
    }
    if (connectionStatus === Conn.disconnected) {
      updateStateValue("nodesSet", false, dispatch);
    }
  }, [connectionStatus]);

  // Forward the received message depending on the node
  useEffect(() => {
    if (lastJsonMessage) {
      onMessage(lastJsonMessage, nodeName, state, dispatch);
    }
  }, [lastJsonMessage]);
});

export default WebSocket;
