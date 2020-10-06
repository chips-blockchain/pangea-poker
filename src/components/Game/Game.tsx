import { useContext, useEffect } from "react";
import WebSocket from "./WebSocket";
import { IState } from "../../store/types";
import { isDealer, isPlayer } from "../../lib/helper";
import { DispatchContext, StateContext } from "../../store/context";
import { Node, Conn } from "../../lib/constants";
import { updateConnectionStatus } from "../../store/actions";

// This component is responsible for the WebSocket connections, as well as displaying the main Start button

// For testing
const SOCKET_URL_ECHO = "wss://echo.websocket.org";

const Game: React.FunctionComponent = () => {
  const state: IState = useContext(StateContext);
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const { isDeveloperMode, nodes, nodeType, message } = state;

  const SOCKET_URL_DCV = `ws://${nodes.dcv}:9000`;
  const SOCKET_URL_PLAYER_READ = `ws://${[Object.values(nodes)[0]]}:9000`;
  const SOCKET_URL_PLAYER_WRITE = `ws://${[Object.values(nodes)[0]]}:9001`;

  // @todo move this to a more appropriate place
  useEffect(() => {
    if (
      !state.connectionStatus.status &&
      (state.connection.playerRead === Conn.connecting ||
        state.connection.playerWrite === Conn.connecting)
    ) {
      updateConnectionStatus(Conn.connecting, dispatch);
    }
    if (
      state.connection.playerRead === Conn.connected &&
      state.connection.playerWrite === Conn.connected &&
      state.connectionStatus.status !== Conn.connected
    ) {
      updateConnectionStatus(Conn.connected, dispatch);
    }
  }, [state]);

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
        <div>
          <WebSocket
            nodeName={Node.playerWrite}
            server={SOCKET_URL_PLAYER_WRITE}
            message={message[Object.keys(nodes)[0]]}
          />
          <WebSocket
            nodeName={Node.playerRead}
            server={SOCKET_URL_PLAYER_READ}
            message={message[Object.keys(nodes)[0]]}
          />
        </div>
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
