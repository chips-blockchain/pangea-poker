import React from "react";
import { Button } from "../Controls";
import { IWithdrawalConfirmationProps } from "./types";
import "./assets/style.css";
import styled from "@emotion/styled"
import { css } from "@emotion/core";

const ConfirmationInformation = styled.div`
  p {
    font-size: var(--font-size-s);
    font-family: var(--font-family-secondary);
    font-weight: 400;
    span {
      font-family: var(--font-family-secondary);
      font-weight: 400;
    }
  }
  grid-area: confirmation;
  text-align: left;
  line-height: 130%;
`

const customStyleButton = css`
  background: var(--color-chipsOrange);
  color: var(--color-almostBlack);
  border: none;
  &:hover {
    color: var(--color-almostBlack);
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 20px auto 20px;
  grid-template-rows: 50px 90px 100px auto 30px;

  grid-template-areas: 
    ". . ."
    ". confirmation ."
    ". confirmation ."
    ". buttons ."
    ". . . ";
`
const CashierButtons = styled.div`
  grid-area: buttons;
`

const WithdrawalConfirmation: React.FunctionComponent<IWithdrawalConfirmationProps> = ({
  amount,
  address,
  back,
  goForward
}) => {
  return (
    <Container>
      <ConfirmationInformation>
        <p style={{gridArea: 'information'}}>
          <span style={{opacity: 0.5}}>You are withdrawing</span> {amount} CHIPS <span style={{opacity: 0.5}}> <br/>to</span> {address}
        </p>
        <p style={{gridArea: 'question', textAlign: 'center'}}>Is that correct?</p>
      </ConfirmationInformation>
      <CashierButtons className="cashierButtons">
        <Button label="Back" onClick={back} />
        <Button customStyle={customStyleButton} label="Confirm" onClick={goForward} />
      </CashierButtons>
    </Container>
  );
};

export default WithdrawalConfirmation;
