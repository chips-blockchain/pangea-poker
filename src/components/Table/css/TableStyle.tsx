import styled from "@emotion/styled";

export const TableContainer = styled.div`
  background-color: var(--dark);
  height: 37.5rem;
  width: 50rem;
  position: relative;
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

export const Absolute = styled.div`
  position: absolute;
`;
