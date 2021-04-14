import { css } from "@emotion/core";
import { useContext } from "react";
import { StateContext } from "../../store/context";
import { IState } from "../../store/types";
import { pickColor } from "./assets/style";

// This component is responsible for displaying the state of the WebSocket connections

const Connections: React.FunctionComponent = () => {
  const state: IState = useContext(StateContext);
  const { connectionStatus, nodeType } = state;

  return (
    <div
      css={css`
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        z-index: 4;
      `}
    >
      return (
      <span
        css={css`
          color: white;
          font-size: var(--font-size-xs);
          padding: 0 0.5rem;
        `}
      >
        {nodeType}
        <span
          css={css`
            color: ${pickColor(connectionStatus.status)};
            padding-left: 0 0.25rem;
          `}
        >
          {connectionStatus.status && " " + connectionStatus.status}
        </span>
      </span>
      )
    </div>
  );
};

export default Connections;
