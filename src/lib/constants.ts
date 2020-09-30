export enum Possibilities {
  "smallBlind" = 1,
  "bigBlind" = 2,
  "check" = 3,
  "raise" = 4,
  "call" = 5,
  "allIn" = 6,
  "fold" = 7
}

export enum PlayerActions {
  allIn = "ALL-IN",
  bet = "BET",
  bigBlind = "BIG BLIND",
  call = "CALL",
  check = "CHECK",
  fold = "FOLD",
  raise = "RAISE",
  smallBlind = "SMALL BLIND"
}

export enum GameTurns {
  "preFlop" = 0,
  "flop" = 1,
  "turn" = 2,
  "river" = 3,
  "showDown" = 4
}

export enum Level {
  info = 1,
  warning = 2,
  error = 3
}

export enum BetWarnings {
  backendNotReady = 0,
  seatAlreadyTaken = 1,
  insufficientFunds = 2,
  tableIsFull = 3
}

export enum Conn {
  connecting = 'Connecting...',
  connected = 'Connected',
  disconnecting = 'Disconnecting...',
  disconnected = 'Disconnected',
  uninstantiated = 'Uninstantiated'
}

export enum Node {
  dcv = 'dcv',
  player = 'player',
  echo = 'echo'
}

export enum NodeType {
  dealer = 'dealer',
  player = 'player'
}