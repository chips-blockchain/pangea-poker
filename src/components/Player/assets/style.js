import styled from "@emotion/styled";
import { css } from "@emotion/core";

// @todo move to a separate const file
// Time Allowance for each player to act in milliseconds
const timeAllowance = 30000;

// Transition speed for the timer animation in seconds
const transitionSpeed = 0.1;

// Rules to change the colors when the time is low
const colorChange = secondsLeft =>
  secondsLeft > timeAllowance * 0.25
    ? "var(--color-accent)"
    : "var(--color-danger)";

export const Balance = styled.div`
  color: var(--color-primaryLight);
  font-size: var(--font-size-xs);
  line-height: 1rem;
  text-align: center;
  text-transform: uppercase;
`;

export const CardsWrapper = styled.div`
  bottom: 0.875rem;
  left: 1.75rem;
  position: absolute;
  opacity: ${p =>
    p.winner && p.gameTurn === p.showDown && p.winner !== p.seat ? "0.5" : "1"};
  z-index: 1;
`;

export const faceDownCards = css`
  bottom: 0;
  left: 3rem;
  position: absolute;
  z-index: 1;
`;

export const PlayerInfo = styled.div`
  align-items: center;
  display: grid;
  background: var(--color-background);
  border-radius: 10rem;
  box-sizing: border-box;
  box-shadow: inset 0 0 0.25rem rgba(255, 255, 255, 0.1);
  border: 2px solid
    ${p => (p.isActive ? colorChange(p.secondsLeft) : "transparent")};
  ${p => p.connected && "grid-template-columns: 1fr 0.5fr;"}
  height: 100%;
  justify-content: center;
  transition: ${transitionSpeed};
  position: absolute;
  width: 100%;
  z-index: 2;

  &:hover div {
    ${p => !p.connected && `color: var(--color-accent)`};
  }
`;

export const PlayerEmoji = styled.span`
  font-size: var(--font-size-xl);
  margin-right: 1rem;
`;

export const PlayerName = styled.div`
  color: ${p => p.color};
  font-size: ${p => (p.connected ? "0.625rem" : "1rem")};
  line-height: 0.875rem;
  text-align: center;
  text-transform: uppercase;
`;

export const PlayerNameWrapper = styled.span`
  ${p => p.connected && "margin-left: 1rem"};
`;

export const playerWidget = css`
  position: relative;
  cursor: pointer;
`;

export const PlayerHighlight = styled("div")`
  background: var(--color-background);
  border: 2px solid ${p => colorChange(p.secondsLeft)};
  height: 0.5rem;
  margin: auto;
  position: relative;
  top: 2.875rem;
  transition: ${transitionSpeed}s;
  width: 6.75rem;
`;

export const PlayerTimerBar = styled("div")`
  background-color: ${p => colorChange(p.secondsLeft)};
  height: 0.5rem;
  width: ${p => (p.secondsLeft / timeAllowance) * 100}%;
  transition: ${transitionSpeed}s;
`;
