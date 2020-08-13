import styled from "@emotion/styled";
import { Level } from "../../../lib/constants";

export const TableContainer = styled.div`
  background-color: var(--dark);
  height: 37.5rem;
  width: 50rem;
  position: relative;
  opacity: ${p => (p.overlay ? 0.3 : 1)};
`;

export const GameTypeWrapper = styled.div`
  color: white;
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  z-index: 4;
  font-size: var(--font-size-xs);
`;

export const TableWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

// Shared pot style

// Main Pot's position at the center of the screen
const { left, top } = {
  left: 0,
  top: "19rem"
};

// Coordinates for where the winner's pot should be pushed
const winnerPotLocation = {
  player1: {
    left: "25rem",
    top: "9.5rem"
  },
  player2: {
    left: "30rem",
    top: "14rem"
  }
};

// Custom animation style for each winner to send each pot to the right location
export const PotContainer = styled.div`
  display: flex;
  justify-content: center;
  left: ${left};
  margin: auto;
  position: absolute;
  right: 4rem;
  top: ${top};
  animation-iteration-count: 1;
  animation: ${p =>
    p.isWinnerSelectTurn &&
    `${`winnerSelect-${p.player}`} 0.5s ease-out 1s forwards`};
  @keyframes ${p => `winnerSelect-${p.player}`} {
    0% {
      left: ${left};
      top: ${top};
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

export const OverlayBg = styled.div`
  background-color: #000000;
  position: absolute;
  height: 37.5rem;
  width: 50rem;
  z-index: 999;
`;

export const Information = styled.div`
  position: absolute;
  color: var(--color-text);
  text-align: center;
  padding-top: 16rem;
  height: 37.5rem;
  width: 50rem;
`;
