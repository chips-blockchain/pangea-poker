import { INotice } from "../components/Table/assets/types";

export interface IPlayer {
  isPlaying: boolean;
  seat: string;
  chips: number;
  hasCards: boolean;
  showCards: boolean;
  isBetting: boolean;
  betAmount: number;
  playerCards: string[];
  connected: boolean;
}

export interface IState {
  players: {
    player1: IPlayer;
    player2: IPlayer;
    player3: IPlayer;
    player4: IPlayer;
    player5: IPlayer;
    player6: IPlayer;
    player7: IPlayer;
    player8: IPlayer;
    player9: IPlayer;
  };
  activePlayer: string;
  backendStatus: number;
  balance: number;
  blinds: [number, number];
  boardCards: string[];
  connection: {
    playerWrite: string;
    playerRead: string;
    dcv: string;
    echo: string;
  };
  controls: {
    canCheck: boolean;
    canRaise: boolean;
    showControls: boolean;
    showFirstRow: boolean;
  };
  cardsDealt: boolean;
  chipsCollected: boolean;
  connectionStatus: INotice;
  currentChipsStack: number;
  dealer: number;
  depositAddress: string;
  gameStarted: boolean;
  gameTurn: 0 | 1 | 2 | 3 | 4;
  gameType: string;
  handHistory: { action: string; timeStamp: number }[];
  handsPlayed: number;
  holeCards: string[];
  isCashierOpen: boolean;
  isDeveloperMode: boolean;
  isLogBox: boolean;
  isShowDown: boolean;
  isStartupModal: boolean;
  lastAction: { player: number; action: string | null };
  lastMessage: object;
  latestTransactionId: string;
  nodesSet: boolean;
  notice: INotice;
  nodes: {
    dcv: string | null;
    player1: string | null;
    player2: string | null;
    echo: string | null;
  };
  nodeType: string;
  maxPlayers: number;
  message: {
    dcv: string | null;
    player1: string | null;
    player2: string | null;
    echo: string | null;
  };
  minRaiseTo: number;
  options: {
    showPotCounter: boolean;
  };
  pot: number[];
  seats: number;
  showDealer: boolean;
  showMainPot: boolean;
  totalPot: number;
  toCall: number;
  transactionFee: number;
  userSeat: string;
  winner: string;
  winners: string[] | null;
  withdrawAddressList: string[];
}
