import { css } from "@emotion/core";
import { useContext, useState, useEffect } from "react";
import theme from "../../styles/theme";
import { DispatchContext, StateContext } from "../../store/context";
import Button from "../Controls/Button";
import { game, updateStateValue, setUserSeat } from "../../store/actions";
import { IState } from "../../store/initialState";

// This is the modal that appears at the startup and prompts the user to type in the
// IP addresses for the nodes. Used for testing purposes only.

const Modal = () => {
  const dispatch: Function = useContext(DispatchContext);
  const state: IState = useContext(StateContext);

  interface INodesToInput {
    name: "dcv" | "bvv" | "player1" | "player2";
    id: "dealer" | "player1" | "player2";
    type: "dealer" | "player";
    devAddress: string;
  }

  const nodesToInput: INodesToInput[] = [
    {
      name: "dcv",
      id: "dealer",
      type: "dealer",
      devAddress: process.env.DEV_SOCKET_URL_DCV
    },
    {
      name: "bvv",
      id: "dealer",
      type: "dealer",
      devAddress: process.env.DEV_SOCKET_URL_BVV
    },
    {
      name: "player1",
      id: "player1",
      type: "player",
      devAddress: process.env.DEV_SOCKET_URL_PLAYER1
    },
    {
      name: "player2",
      id: "player2",
      type: "player",
      devAddress: process.env.DEV_SOCKET_URL_PLAYER2
    }
  ];
  const [nodes, setNodes] = useState({});
  const [nodeType, setNodeType] = useState("");
  const [canSetNodes, setCanSetNodes] = useState(false);

  const closeStartupModal = () => {
    dispatch({
      type: "closeStartupModal"
    });
  };

  const hanldeTabClick: Function = (
    e: React.FormEvent<EventTarget>,
    nodeType: "dealer" | "player"
  ): void => {
    setNodes({});
    e.preventDefault();
    setNodeType(nodeType);
  };

  const handleSubmit: Function = (): void => {
    const nodeTypeToSet: string =
      nodeType === "dealer" ? "dealer" : nodeType.slice(0, -1);
    updateStateValue("nodes", nodes, dispatch);
    updateStateValue("nodeType", nodeTypeToSet, dispatch);

    nodeTypeToSet === "player" &&
      game({ gametype: "", pot: [0] }, state, dispatch);
    setUserSeat(nodeType, dispatch);
    closeStartupModal();
  };

  const setDevNodeTypes = (node: "dealer" | "player1" | "player2") => {
    switch (node) {
      case "dealer":
        setNodes({
          dcv: process.env.DEV_SOCKET_URL_DCV,
          bvv: process.env.DEV_SOCKET_URL_BVV
        });
        break;
      case "player1":
        setNodes({ player1: process.env.DEV_SOCKET_URL_PLAYER1 });
        break;
      case "player2":
        setNodes({ player2: process.env.DEV_SOCKET_URL_PLAYER2 });
        break;
    }
  };

  // Validates wether all four input fields have data
  useEffect(() => {
    nodeType === "dealer" &&
      Object.keys(nodes).length === 2 &&
      setCanSetNodes(true);
    nodeType === "player1" &&
      Object.keys(nodes).length === 1 &&
      setCanSetNodes(true);
    nodeType === "player2" &&
      Object.keys(nodes).length === 1 &&
      setCanSetNodes(true);
  }, [nodes]);

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
        <form>
          <h1
            css={css`
              font-size: 1rem;
            `}
          >
            Please enter the node addresses
          </h1>
          <div>
            <Button
              small
              label="Dealer"
              onClick={e => {
                hanldeTabClick(e, "dealer");
                process.env && setDevNodeTypes("dealer");
              }}
            />
            <Button
              small
              label="Player1"
              onClick={e => {
                hanldeTabClick(e, "player1");
                process.env && setDevNodeTypes("player1");
              }}
            />
            <Button
              small
              label="Player2"
              onClick={e => {
                hanldeTabClick(e, "player2");
                process.env && setDevNodeTypes("player2");
              }}
            />
          </div>
          <div id="Dealer" />
          {nodesToInput
            .filter(node => node.id === nodeType)
            .map((node, key) => {
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
                    {node.name}
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
                    name={node.name}
                    placeholder={`192.168.101.234`}
                    defaultValue={process.env ? node.devAddress : ""}
                    onChange={e => {
                      setNodes({
                        ...nodes,
                        [node.name]: e.target.value
                      });
                    }}
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
                handleSubmit();
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
