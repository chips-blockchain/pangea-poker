import { useContext } from "react";
import WebSocket from "./WebSocket";
import { DispatchContext, StateContext } from "../../store/context";
import { Button } from "../Controls";
import { sendMessage } from "../../store/actions";
import { IState } from "../../store/initialState";
import { GameWrapper, DealerContainer } from "./assets/style";

// This component is responsible for the WebSocket connections, as well as displaying the main Start button

// For testing
const SOCKET_URL_ECHO = "wss://echo.websocket.org";

const Game: React.FunctionComponent = () => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const { isDeveloperMode, isStartupModal, nodes, nodeType, message } = state;

  const SOCKET_URL_DCV = `ws://${nodes.dcv}:9000`;
  const SOCKET_URL_PLAYER1 = `ws://${[Object.values(nodes)[0]]}:9000`;

  const startGame = () => (): void => {
    sendMessage({ method: "game" }, "dcv", state, dispatch);
  };

  const resetGame = () => (): void => {
    sendMessage({ method: "reset" }, "dcv", state, dispatch);
  };

  return (
    <div>
      <GameWrapper>
        {nodeType === "dealer" && (
          <DealerContainer>
            <Button label="Start" onClick={startGame()} />
            <Button label="Reset" onClick={resetGame()} />
          </DealerContainer>
        )}
      </GameWrapper>

      {state.nodesSet && nodeType === "dealer" && (
        <div>
          <WebSocket
            nodeName="dcv"
            server={SOCKET_URL_DCV}
            message={message.dcv}
          />
        </div>
      )}

      {state.nodesSet && nodeType === "player" && (
        <WebSocket
          nodeName={Object.keys(nodes)[0]}
          server={SOCKET_URL_PLAYER1}
          message={message[Object.keys(nodes)[0]]}
        />
      )}
      {state.nodesSet && isDeveloperMode && (
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
