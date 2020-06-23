import styled from "@emotion/styled";

export const BetWrapper = styled.span`
  align-items: center;
  display: grid;
  grid-area: ${p => p.forPlayer};
  position: relative;
  opacity: ${p => (p.playerBet && p.chipsCollected ? 0 : 1)};
  ${p =>
    p.forPlayer === "player2" || p.forPlayer === "player3"
      ? "grid-template-columns: 4rem 1.25rem; left: -3.5rem;"
      : "grid-template-columns: 1.25rem 4rem;"}
  transition-delay: 0.4s;
`;

export const StackWrapper = styled.span`
  ${p =>
    p.forPlayer === "player2" || p.forPlayer === "player3"
      ? "order: 2;"
      : "order: 1;"}
`;

export const AmountWrapper = styled.span`
  color: var(--color-text);
  font-size: var(--font-size-xxs);
  padding: 0 0 0.5rem 0.3rem;
  position: relative;
  order: 1;
  opacity: ${p => (p.playerBet && p.chipsCollected ? 0 : 1)};
  ${p =>
    p.forPlayer === "player2" || p.forPlayer === "player3"
      ? "padding-right: 0.3rem; text-align: right; order: 1;"
      : ""};
`;
