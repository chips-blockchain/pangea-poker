import React from "react";
import { IWithdrawalInfoProps } from "./types";
import styled from "@emotion/styled";
import "./assets/style.css";

const CahierInfo = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
`;

const InfoLine = styled.div`
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-s);
  justify-content: space-between;
  align-items: center;
  h5,
  div {
    margin: 0;
  }
  h5 {
    opacity: 0.5;
    font-size: var(--font-size-s);
    font-weight: 400;
    margin-top: 0.25rem;
  }
  div {
    color: var(--color-chipsTealLight);
  }
`;

const WithdrawalInfo: React.FunctionComponent<IWithdrawalInfoProps> = ({
  balance,
  difference
}) => {
  return (
    <CahierInfo>
      <InfoLine>
        <h5>Fee</h5>
        <div>{balance} CHIPS</div>
      </InfoLine>
      <InfoLine>
        <h5>Total</h5>
        <div>{difference} CHIPS</div>
      </InfoLine>
    </CahierInfo>
  );
};

export default WithdrawalInfo;
