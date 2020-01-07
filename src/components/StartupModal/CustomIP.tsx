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

const CustomIP: React.FunctionComponent = (): React.ReactElement => {
  const dispatch: Function = useContext(DispatchContext);
  const state: IState = useContext(StateContext);

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
    text-align: center;
    padding: 0.5rem 0.25rem;
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

  // Nodes to input
  interface INode {
    name: "dcv" | "bvv" | "player1" | "player2";
    id: "dealer" | "player1" | "player2";
    type: "dealer" | "player";
    devAddress: string;
  }

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
  const [nodes, setNodes] = useState({});
  const [nodeType, setNodeType] = useState("");
  const [canSetNodes, setCanSetNodes] = useState(false);

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
  ) => (e: React.FormEvent<EventTarget>): void => {
    setNodes({});
    e.preventDefault();
    setNodeType(nodeType);
    process.env && setDevNodeTypes(nodeType);
  };

  const handleSubmit: Function = () => (
    e: React.FormEvent<EventTarget>
  ): void => {
    e.preventDefault();

    const isDealer = nodeType === "dealer";
    const nodeTypeToSet: string = isDealer ? "dealer" : nodeType.slice(0, -1);
    updateStateValue("nodes", nodes, dispatch);
    updateStateValue("nodeType", nodeTypeToSet, dispatch);

    nodeTypeToSet === "player" &&
      game({ gametype: "", pot: [0] }, state, dispatch);
    setUserSeat(nodeType, dispatch);
    const opponent = nodeType === "player1" ? "player2" : "player1";
    !isDealer && connectPlayer(opponent, dispatch);
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

  // Validates wether all four input fields have data
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
          <Tab onClick={handleTabClick("dealer")}>Dealer</Tab>
          <Tab onClick={handleTabClick("player1")}>Player1</Tab>
          <Tab onClick={handleTabClick("player2")}>Player2</Tab>
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
        />
      </ButtonWrapper>
    </form>
  );
};

export default CustomIP;
