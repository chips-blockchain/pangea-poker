import { useContext } from "react";
import WebSocket from "./WebSocket";
import { IState } from "../../store/types";
import { isDealer, isPlayer } from "../../lib/helper";
import { StateContext } from "../../store/context";

// This component is responsible for the WebSocket connections, as well as displaying the main Start button

// For testing
const SOCKET_URL_ECHO = "wss://echo.websocket.org";

const Game: React.FunctionComponent = () => {
  const state: IState = useContext(StateContext);
  const { isDeveloperMode, nodes, nodeType, message } = state;

  const SOCKET_URL_DCV = `ws://${nodes.dcv}:9000`;
  const SOCKET_URL_PLAYER1 = `ws://${[Object.values(nodes)[0]]}:9000`;

  return (
    <div>
      {state.nodesSet && isDealer(nodeType) && (
        <div>
          <WebSocket
            nodeName="dcv"
            server={SOCKET_URL_DCV}
            message={message.dcv}
          />
        </div>
      )}

      {state.nodesSet && isPlayer(nodeType) && (
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
