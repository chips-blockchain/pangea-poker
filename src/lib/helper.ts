import { NodeType } from "./constants";

export const isDealer = (nodeType: string): boolean => {
  return nodeType === NodeType.dealer;
};

export const isPlayer = (nodeType: string): boolean => {
  return nodeType === NodeType.player;
};
