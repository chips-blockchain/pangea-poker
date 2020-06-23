import styled from "@emotion/styled";

export const GameWrapper = styled.div`
  position: absolute;
  z-index: 5;
  top: 4;
`;

export const DealerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;
