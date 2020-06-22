import styled from "@emotion/styled";

export const LogBoxSection = styled.section`
  background: var(--color-background);
  border: 1px solid var(--color-primary);
  bottom: 1.75rem;
  padding: 0.5rem;
  position: absolute;
  overflow: scroll;
  left: 1rem;
  height: 6rem;
  width: 18rem;
`;

export const Log = styled.div`
  color: var(--color-primaryLight);
  font-family: var(--font-family-secondary);
  font-weight: 400;
  font-size: var(--font-size-s);
  margin: 0.125rem;
`;