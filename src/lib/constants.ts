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
  fold = "FOLD",
  check = "CHECK",
  raise = "RAISE",
  call = "CALL",
  smallBlind = "SMALL BLIND",
  bigBlind = "BIG BLIND",
  allIn = "ALL-IN"
}

export enum GameTurns {
  "preFlop" = 0,
  "flop" = 1,
  "turn" = 2,
  "river" = 3,
  "showDown" = 4
}
