import styled from "@emotion/styled";
import { Level } from "../../../lib/constants";

export const TableContainer = styled.div`
  background-color: var(--dark);
  height: 100vh;
  width: 100vw;
  position: relative;
  opacity: ${p => (p.overlay ? 0.3 : 1)};
`;

export const TableWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

// Shared pot style

const start = {
  left: "50%",
  top: "calc(50% + 3rem)"
};

const winnerPotLocation = {
  player1: { left: "calc(50% + 5.5625rem)", top: "calc(50% - 9.9375rem)" },
  player2: { left: "calc(50% + 18.1875rem)", top: "calc(50% - 3.3125rem)" },
  player3: { left: "calc(50% + 18.1875rem)", top: "calc(50% + 3.3125rem)" },
  player4: { left: "calc(50% + 12.6875rem)", top: "calc(50% + 9.9375rem)" },
  player5: { left: "calc(50% - 0.8125rem)", top: "calc(50% + 9.9375rem)" },
  player6: { left: "calc(50% - 12.6875rem)", top: "calc(50% + 9.9375rem)" },
  player7: { left: "calc(50% - 18.1875rem)", top: "calc(50% + 3.3125rem)" },
  player8: { left: "calc(50% - 18.1875rem)", top: "calc(50% - 3.3125rem)" },
  player9: { left: "calc(50% - 8.1875rem)", top: "calc(50% - 9.9375rem)" }
};

export const PotContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: ${start.left};
  top: ${start.top};
  transform: translate(-50%, -50%);
  animation-iteration-count: 1;
  animation: ${p =>
    p.isWinnerSelectTurn &&
    `${`winnerSelect-${p.player}`} 0.5s ease-out 1s forwards`};
  @keyframes ${p => `winnerSelect-${p.player}`} {
    0% {
      left: ${start.left};
      top: ${start.top};
    }
    100% {
      left: ${p => p.player && winnerPotLocation[p.player].left};
      top: ${p => p.player && winnerPotLocation[p.player].top};
    }
  }
`;

const noticeColors = {
  [Level.info]: "var(--color-text)",
  [Level.warning]: "var(--color-accent)",
  [Level.error]: "var(--color-danger)"
};

export const Notice = styled.div`
  color: ${props => noticeColors[props.level]};
  float: right;
  font-size: var(--font-size-l);
  right: 2.9375rem;
  bottom: 2.5rem;
  position: absolute;
`;
