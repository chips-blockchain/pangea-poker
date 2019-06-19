import React, { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { DispatchContext, StateContext } from "../Table";

const STATIC_OPTIONS = {};
const READY_STATE_OPEN = 1;

const WebSocket = React.memo(props => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [currentSocketUrl, setCurrentSocketUrl] = useState(props.server);
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
    if (props.message !== null) {
      if (readyState === 1) {
      }
      console.log(props.message + " has been sent");
      sendMessage(props.message);
    }
  }, [props]);

  // If the connection status changes, update the state
  useEffect(() => {
    if (state.connection[props.nodeName] !== readyStateString) {
      dispatch({
        type: "Connect",
        payload: { nodeName: props.nodeName, readyState: readyStateString }
      });
    }
  });

  useEffect(() => {
    if (
      state.connection[props.nodeName] === "Connected" &&
      props.nodeName !== "dcv" &&
      props.nodeName !== "bvv"
    ) {
      dispatch({
        type: "toggleIsPlaying",
        payload: props.nodeName
      });
    }
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
