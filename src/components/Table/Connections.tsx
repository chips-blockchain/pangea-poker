import { css } from "@emotion/core";
import { useContext } from "react";
import { StateContext } from "../../store/context";
import { IState } from "../../store/initialState";

// This component is responsible for displaying the state of the WebSocket connections

const Connections: React.FunctionComponent = () => {
  const state: IState = useContext(StateContext);
  const { connection, nodeType } = state;

  let nodeList = [];

  const dealerNodeList = [
    ["DCV", connection.dcv],
    ["BVV", connection.bvv]
  ];

  const playerNode = ["Player", connection[Object.keys(state.nodes)[0]]];

  if (nodeType === "dealer") nodeList = dealerNodeList;
  if (nodeType === "player") nodeList.push(playerNode);

  return (
    <div
      css={css`
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        z-index: 4;
      `}
    >
      {nodeList.map((node, key) => {
        return (
          <span
            css={css`
              color: white;
              font-size: var(--font-size-xs);
              padding: 0 0.5rem;
            `}
            key={key}
          >
            {node[0]}:
            <span
              css={css`
                color: ${node[1] === "Connected"
                  ? "var(--color-primaryLight)"
                  : node[1] === "Connecting..."
                  ? "var(--color-accent)"
                  : "var(--color-danger)"};
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
