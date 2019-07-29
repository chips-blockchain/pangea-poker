/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext, useEffect, useState } from "react";
import theme from "../../styles/theme";
import { DispatchContext, StateContext } from "../store/context";
import Button from "../Controls/Button";

const Modal = () => {
  const nodesToInput = ["dcv", "bvv", "player1", "player2"];
  const [nodes, setNodes] = useState({});
  const [canSetNodes, setCanSetNodes] = useState(false);

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const closeStartupModal = () => {
    dispatch({
      type: "closeStartupModal"
    });
  };

  const handleButtonClick = nodesObject => {
    setNodeAddress(nodesObject);
    closeStartupModal();
  };

  const setNodeAddress = nodes => {
    dispatch({
      type: "setNodeAdresses",
      payload: nodes
    });
  };

  // Validates wether all four input fields have data
  useEffect(() => {
    if (Object.keys(nodes).length === 4) {
      setCanSetNodes(true);
    }
  });

  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 37.5rem;
        width: 50rem;
        z-index: 999;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${theme.moon.colors.background};
          opacity: 0.5;
        `}
      />
      <div
        css={css`
          color: ${theme.moon.colors.text};
          background-color: ${theme.moon.colors.background};
          left: 50%;
          margin: auto;
          transform: translate(-50%, -50%);
          text-align: center;
          top: 50%;
          padding: 2rem 5.5rem;
          position: absolute;
          right: 0;
        `}
      >
        <h1
          css={css`
            font-size: 1rem;
          `}
        >
          Please enter the node addresses
        </h1>
        <p
          css={css`
            font-size: 0.75rem;
            font-weight: 500;
            font-family: sans-serif;
          `}
        >
          Don't forget to add the ports. By default, they should be 9000, 9001,
          9002 and 9003.
        </p>
        <form>
          {nodesToInput.map((nodeName, key) => {
            return (
              <div key={key}>
                {/* Label*/}
                <div
                  css={css`
                    color: ${theme.moon.colors.text};
                    padding: 1rem 0 0.5rem 0;
                    font-size: 0.875rem;
                  `}
                >
                  {nodeName}
                </div>
                {/* Input field */}
                <input
                  css={css`
                    background: none;
                    border: 1px solid ${theme.moon.colors.primary};
                    color: white;
                    font-family: sans-serif;
                    font-weight: 500;
                    text-align: center;
                    padding: 0.5rem 0.25rem;
                    width: 100%;

                    &:focus {
                      border: 1px solid ${theme.moon.colors.accent};
                    }
                  `}
                  placeholder={`192.168.101.234:${9000 + key}`}
                  onChange={e => {
                    setNodes({
                      ...nodes,
                      [nodeName]: e.target.value
                    });
                  }}
                  name={`nodeAddress-${key}`}
                />
              </div>
            );
          })}
          <div
            css={css`
              text-align: center;
              padding-top: 2rem;
            `}
          >
            <Button
              label="Set Nodes"
              disabled={!canSetNodes}
              onClick={e => {
                e.preventDefault();
                handleButtonClick(nodes);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
