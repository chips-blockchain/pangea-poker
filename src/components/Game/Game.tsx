import { css } from "@emotion/core";
import { useContext } from "react";
import WebSocket from "./WebSocket";
import { DispatchContext, StateContext } from "../../store/context";
import { Button } from "../Controls";
import { sendMessage } from "../../store/actions";
import { IState } from "../../store/initialState";

// This component is responsible for the WebSocket connections, as well as displaying the main Start button

// For testing
const SOCKET_URL_ECHO = "wss://echo.websocket.org";

const Game: React.FunctionComponent = () => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const { isDeveloperMode, isStartupModal, nodes, nodeType, message } = state;

  const SOCKET_URL_DCV = `ws://${nodes.dcv}:9000`;
  const SOCKET_URL_BVV = `ws://${nodes.bvv}:9000`;
  const SOCKET_URL_PLAYER1 = `ws://${[Object.values(nodes)[0]]}:9000`;

  const startGame = () => (): void => {
    sendMessage({ method: "game" }, "dcv", state, dispatch);
  };

  const resetGame = () => (): void => {
    sendMessage({ method: "reset" }, "dcv", state, dispatch);
  };

  return (
    <div>
      <div
        css={css`
          position: absolute;
          z-index: 5;
          top: 4;
        `}
      >
        {nodeType === "dealer" && (
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              grid-template-rows: repeat(3, 1fr);
            `}
          >
            <Button label="Start" onClick={startGame()} />
            <Button label="Reset" onClick={resetGame()} />
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
      />

      {!isStartupModal && nodeType === "dealer" && (
        <div>
          <WebSocket
            nodeName="dcv"
            server={SOCKET_URL_DCV}
            message={message.dcv}
          />
          <WebSocket
            nodeName="bvv"
            server={SOCKET_URL_BVV}
            message={message.bvv}
          />
        </div>
      )}

      {!isStartupModal && nodeType === "player" && (
        <WebSocket
          nodeName={Object.keys(nodes)[0]}
          server={SOCKET_URL_PLAYER1}
          message={message[Object.keys(nodes)[0]]}
        />
      )}
      {!isStartupModal && isDeveloperMode && (
        <WebSocket
          nodeName="echo"
          server={SOCKET_URL_ECHO}
          message={message.echo}
        />
      )}
    </div>
  );
};

export default Game;
