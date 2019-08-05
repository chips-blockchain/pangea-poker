/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { StateContext } from "../store/context";
import theme from "../../styles/theme";

const Connections = () => {
  const state = useContext(StateContext);
  const { connection, isDeveloperMode } = state;

  let nodeList = [];

  const dealerNodeList = [["DCV", connection.dcv], ["BVV", connection.bvv]];

  const playerNode = ["Player", connection[Object.keys(state.nodes)[0]]];

  if (state.nodeType === "dealer") nodeList = dealerNodeList;
  if (state.nodeType === "player") nodeList.push(playerNode);

  return (
    <div
      css={css`
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        z-index: 4;
      `}
    >
      {/* Display echo websocket in Developer Mode */}
      {isDeveloperMode && nodeList.push(["Echo", connection.echo])}

      {nodeList.map((node, key) => {
        return (
          <span
            css={css`
              color: white;
              font-size: 0.75rem;
              padding: 0 0.5rem;
            `}
            key={key}
          >
            {node[0]}:
            <span
              css={css`
                color: ${node[1] === "Connected"
                  ? theme.moon.colors.primaryLight
                  : node[1] === "Connecting..."
                  ? theme.moon.colors.accent
                  : theme.moon.colors.danger};
                padding-left: 0 0.25rem;
              `}
            >
              {" " + node[1]}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default Connections;
