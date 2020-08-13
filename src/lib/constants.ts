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
  backend_not_ready = 0, 
  seat_already_taken =1, 
  insufficient_funds = 2, 
  table_is_full = 3
};
