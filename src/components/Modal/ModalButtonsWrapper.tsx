import React from "react";
import styled from "@emotion/styled";

const ButtonWrapper = styled.div`
  bottom: 2rem;
  left: 0;
  position: absolute;
  text-align: center;
  width: 100%;
`;

const ModalButtonsWrapper: React.FunctionComponent = ({ children }) => {
  return <ButtonWrapper>{children}</ButtonWrapper>;
};

export default ModalButtonsWrapper;
