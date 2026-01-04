import React from "react";
import { useContext, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DispatchContext, StateContext } from "../../store/context";
import { game, updateStateValue } from "../../store/actions";
import { IState } from "../../store/initialState";
import Button from "../Controls/Button";
import { ModalButtonsWrapper, ConnectionStatus } from "./assets/style";
import { Input } from "../Form";
import development from "../../config/development.json";

interface INode {
  name: "dcv" | "player";
  type: "dealer" | "player";
  tableId: string;
  devAddress: string;
}

// Nodes to input

const nodesToInput: INode[] = [
  {
    name: "dcv",
    id: "dealer",
    type: "dealer",
    tableId: "",
    devAddress: "159.69.23.31"
  },
  {
    name: "player",
    id: "player",
    type: "player",
    devAddress: "159.69.23.31"
  }
];

const CustomIP: React.FunctionComponent = () => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const [nodes, setNodes] = useState({
    dcv: "159.69.23.31",
    player: "159.69.23.31"
  });
  const [ports, setPorts] = useState({
    dcv: "9000",
    player: "9001"
  });
  const [nodeType, setNodeType] = useState("dealer");
  const [canSetNodes, setCanSetNodes] = useState(false);

  // Event handlers
  const handleTabClick = (nodeType: "dealer" | "player") => (): void => {
    // Update the node type
    setNodeType(nodeType);
  };

  const handleSubmit = () => (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    // Set the node addresses with port and the node type
    const isDealer = nodeType === "dealer";
    const nodeKey = isDealer ? "dcv" : "player";
    const nodeAddress = `${nodes[nodeKey]}:${ports[nodeKey]}`;
    const nodesToSet = isDealer ? { dcv: nodeAddress } : { player: nodeAddress };

    const nodeTypeToSet: string = isDealer ? "dealer" : "player";

    updateStateValue("nodes", nodesToSet, dispatch);
    updateStateValue("nodeType", nodeTypeToSet, dispatch);

    // Start the game if it's a player node
    !isDealer && game({ gametype: "", pot: [0] }, state, dispatch);

    updateStateValue("nodesSet", true, dispatch);
  };

  const handleInputChange = (node: INode) => (
    e: ChangeEvent<Element>
  ): void => {
    const target = e.target as HTMLInputElement;
    setNodes({
      ...nodes,
      [node.name]: target.value
    });
  };

  const handlePortChange = (nodeName: string) => (
    e: ChangeEvent<Element>
  ): void => {
    const target = e.target as HTMLInputElement;
    setPorts({
      ...ports,
      [nodeName]: target.value
    });
  };

  // Validates whether all required input fields have data
  useEffect((): void => {
    if (nodeType === "dealer") {
      (nodes.dcv && ports.dcv) ? setCanSetNodes(true) : setCanSetNodes(false);
    }
    if (nodeType === "player") {
      (nodes.player && ports.player) ? setCanSetNodes(true) : setCanSetNodes(false);
    }
  }, [nodes, ports, nodeType]);

  return (
    <form>
      <Tabs>
        <TabList>
          <Tab onClick={handleTabClick("dealer")} data-test="tab-dealer">
            Dealer
          </Tab>
          <Tab onClick={handleTabClick("player")} data-test="tab-player">
            Player
          </Tab>
        </TabList>

        {nodesToInput.map((node, key) => {
          return (
            <TabPanel key={key}>
              <Input
                defaultValue={node.devAddress}
                label={`${node.name} IP`}
                name={node.name}
                onChange={handleInputChange(node)}
                placeholder={`${node.name}'s IP Address`}
                type={"text"}
              />
              <Input
                defaultValue={ports[node.name]}
                label={`${node.name} Port`}
                name={`${node.name}-port`}
                onChange={handlePortChange(node.name)}
                placeholder={`${node.name}'s WebSocket Port`}
                type={"number"}
              />
              <ConnectionStatus level={state.connectionStatus.level}>
                {state.connectionStatus.text}
              </ConnectionStatus>
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
