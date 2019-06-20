import React, { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { DispatchContext, StateContext } from "../Table";

const STATIC_OPTIONS = {};
const READY_STATE_OPEN = 1;

const WebSocket = React.memo(({ children, message, nodeName, server }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [currentSocketUrl, setCurrentSocketUrl] = useState(server);
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputtedMessage, setInputtedMessage] = useState("");
  const [sendMessage, lastMessage, readyState] = useWebSocket(
    currentSocketUrl,
    STATIC_OPTIONS
  );

  useEffect(() => {
    lastMessage && setMessageHistory(prev => prev.concat(lastMessage.data));
  }, [lastMessage]);

  // Send a message if props changes
  useEffect(() => {
    if (message !== null) {
      if (readyState === 1) {
      }
      console.log(message + " has been sent");
      sendMessage(message);
    }
  }, [message]);

  // If the connection status changes, update the state
  useEffect(() => {
    if (state.connection[nodeName] !== readyStateString) {
      dispatch({
        type: "Connect",
        payload: { nodeName: nodeName, readyState: readyStateString }
      });
    }
  });

  useEffect(() => {
    if (
      nodeName !== "dcv" &&
      nodeName !== "bvv" &&
      state.connection[nodeName] === "Connected" &&
      state.players[nodeName].isPlaying === false
    ) {
      dispatch({
        type: "toggleIsPlaying",
        payload: nodeName
      });
    }
  });

  useEffect(() => {
    console.log(lastMessage);
  });

  const readyStateString = {
    0: "Connecting...",
    1: "Connected",
    2: "Disconnecting...",
    3: "Disconnected"
  }[readyState];

  return (
    <React.Fragment />
    // <div>
    //   Whatever you send will be echoed from the Server
    //   <div>
    //     <input
    //       type={"text"}
    //       value={inputtedMessage}
    //       onChange={e => setInputtedMessage(e.target.value)}
    //     />
    //     <button
    //       onClick={() => sendMessage(inputtedMessage)}
    //       disabled={readyState !== READY_STATE_OPEN}
    //     >
    //       Send
    //     </button>
    //   </div>
    //   <br />
    //   ReadyState: {readyStateString}
    //   <br />
    //   MessageHistory: {messageHistory.join(", ")}
    // </div>
  );
});

export default WebSocket;
