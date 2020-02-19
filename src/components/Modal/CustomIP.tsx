import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { useContext, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DispatchContext, StateContext } from "../../store/context";
import Button from "../Controls/Button";
import {
  connectPlayer,
  closeStartupModal,
  game,
  updateStateValue,
  setUserSeat
} from "../../store/actions";
import { IState } from "../../store/initialState";
import ModalButtonsWrapper from "./ModalButtonsWrapper";

interface INode {
  name: "dcv" | "bvv" | "player1" | "player2";
  id: "dealer" | "player1" | "player2";
  type: "dealer" | "player";
  devAddress: string;
}

// Nodes to input

const nodesToInput: INode[][] = [
  [
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
    }
  ],
  [
    {
      name: "player1",
      id: "player1",
      type: "player",
      devAddress: process.env.DEV_SOCKET_URL_PLAYER1
    }
  ],
  [
    {
      name: "player2",
      id: "player2",
      type: "player",
      devAddress: process.env.DEV_SOCKET_URL_PLAYER2
    }
  ]
];

// Styles

const inputStyle = css`
  background: none;
  border: 1px solid var(--color-primary);
  color: white;
  font-family: sans-serif;
  font-weight: 500;
  max-width: 14rem;
  padding: 0.5rem 0.25rem;
  text-align: center;
  width: 100%;

  &:focus {
    border: 1px solid var(--color-accent);
  }
`;

const Label = styled.div`
  color: var(--color-text);
  padding: 1rem 0 0.5rem 0;
  font-size: 0.875rem;
`;

const CustomIP: React.FunctionComponent = () => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);

  const [nodes, setNodes] = useState({
    dcv: process.env.DEV_SOCKET_URL_DCV,
    bvv: process.env.DEV_SOCKET_URL_BVV,
    player1: process.env.DEV_SOCKET_URL_PLAYER1,
    player2: process.env.DEV_SOCKET_URL_PLAYER2
  });
  const [nodeType, setNodeType] = useState("dealer");
  const [canSetNodes, setCanSetNodes] = useState(false);

  // Event handlers
  const handleTabClick: Function = (
    nodeType: "dealer" | "player1" | "player2"
  ) => (): void => {
    // Update the node type
    setNodeType(nodeType);
  };

  const handleSubmit: Function = () => (
    e: React.FormEvent<EventTarget>
  ): void => {
    e.preventDefault();

    // Set the node addresses and the node type
    const isDealer = nodeType === "dealer";
    const nodesToSet = isDealer
      ? { dcv: nodes.dcv, bvv: nodes.bvv }
      : { [nodeType]: nodes[nodeType] };
    const nodeTypeToSet: string = isDealer ? "dealer" : "player";
    updateStateValue("nodes", nodesToSet, dispatch);
    updateStateValue("nodeType", nodeTypeToSet, dispatch);

    // Start the game if it's a player node
    !isDealer && game({ gametype: "", pot: [0] }, state, dispatch);

    // Set the user seat if it's a player node
    !isDealer && setUserSeat(nodeType, dispatch);

    // Connect the opponent (temporary)
    const opponent = nodeType === "player1" ? "player2" : "player1";
    !isDealer && connectPlayer(opponent, dispatch);

    // Close the Startup Modal
    closeStartupModal(dispatch);
  };

  const handleInputChange: Function = (node: INode) => (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    const target = e.target as HTMLInputElement;
    setNodes({
      ...nodes,
      [node.name]: target.value
    });
  };

  // Validates whether all required input fields have data
  useEffect((): void => {
    if (nodeType === "dealer") {
      nodes.dcv && nodes.bvv ? setCanSetNodes(true) : setCanSetNodes(false);
    }
    if (nodeType === "player1") {
      nodes.player1 ? setCanSetNodes(true) : setCanSetNodes(false);
    }
    if (nodeType === "player2") {
      nodes.player2 ? setCanSetNodes(true) : setCanSetNodes(false);
    }
  }, [nodes, nodeType]);

  return (
    <form>
      <Tabs>
        <TabList>
          <Tab onClick={handleTabClick("dealer")} data-test="tab-dealer">
            Dealer
          </Tab>
          <Tab onClick={handleTabClick("player1")} data-test="tab-player1">
            Player1
          </Tab>
          <Tab onClick={handleTabClick("player2")} data-test="tab-player2">
            Player2
          </Tab>
        </TabList>

        {nodesToInput.map((nodeType, key) => {
          return (
            <TabPanel key={key}>
              {nodeType.map((node, j) => {
                return (
                  <div key={j}>
                    <Label>{node.name}</Label>
                    <input
                      css={inputStyle}
                      name={node.name}
                      placeholder={`192.168.101.234`}
                      defaultValue={process.env ? node.devAddress : ""}
                      onChange={handleInputChange(node)}
                    />
                  </div>
                );
              })}
            </TabPanel>
          );
        })}
      </Tabs>
      <ModalButtonsWrapper>
        <Button
          label="Set Nodes"
          disabled={!canSetNodes}
          onClick={handleSubmit()}
          data-test="set-nodes-button"
        />
      </ModalButtonsWrapper>
    </form>
  );
};

export default CustomIP;
