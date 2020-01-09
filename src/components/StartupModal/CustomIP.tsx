import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { useContext, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import theme from "../../styles/theme";
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

const ButtonWrapper = styled.div`
  text-align: center;
  padding-top: 2rem;
`;

const inputStyle = css`
  background: none;
  border: 1px solid ${theme.moon.colors.primary};
  color: white;
  font-family: sans-serif;
  font-weight: 500;
  max-width: 14rem;
  padding: 0.5rem 0.25rem;
  text-align: center;
  width: 100%;

  &:focus {
    border: 1px solid ${theme.moon.colors.accent};
  }
`;

const Label = styled.div`
  color: ${theme.moon.colors.text};
  padding: 1rem 0 0.5rem 0;
  font-size: 0.875rem;
`;

const CustomIP: React.FunctionComponent = () => {
  const dispatch: Function = useContext(DispatchContext);
  const state: IState = useContext(StateContext);

  const [nodes, setNodes] = useState({});
  const [nodeType, setNodeType] = useState("dealer");
  const [canSetNodes, setCanSetNodes] = useState(false);

  // Function to set node addresses from the .env file
  const setDevNodeTypes = (node: "dealer" | "player1" | "player2"): void => {
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

  // Event handlers
  const handleTabClick: Function = (
    nodeType: "dealer" | "player1" | "player2"
  ) => (): void => {
    // Clear previously set nodes
    setNodes({});

    // Update the node type
    setNodeType(nodeType);

    // Set node addresses as placeholder if specified in the .env file
    process.env && setDevNodeTypes(nodeType);
  };

  const handleSubmit: Function = () => (
    e: React.FormEvent<EventTarget>
  ): void => {
    e.preventDefault();

    // Set the node addresses and the node type
    const isDealer = nodeType === "dealer";
    const nodeTypeToSet: string = isDealer ? "dealer" : "player";
    updateStateValue("nodes", nodes, dispatch);
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

  // Validates wether all required input fields have data
  useEffect((): void => {
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
    <form>
      <h2>Please enter the node addresses</h2>
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
      <ButtonWrapper>
        <Button
          label="Set Nodes"
          disabled={!canSetNodes}
          onClick={handleSubmit()}
          data-test="set-nodes-button"
        />
      </ButtonWrapper>
    </form>
  );
};

export default CustomIP;
