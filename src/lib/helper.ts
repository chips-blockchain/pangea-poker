import { NodeType } from "./constants"

export const isDealer = (nodeType) => {
    return nodeType === NodeType.dealer
}

export const isPlayer = (nodeType) => {
    return nodeType === NodeType.player
}