import styled from "@emotion/styled";
import { Status } from "../../../lib/constants";

/** DEPOSIT */

export const AdditionalInfo = styled.p`
  font-family: var(--font-family-secondary);
  font-weight: 400;
  font-size: var(--font-size-s);
  margin-top: 1.5rem;
`;

export const AddressLabel = styled.h2`
  font-family: var(--font-family-secondary);
  font-weight: 400;
  font-size: var(--font-size-s);
  margin-top: 2rem;
  text-align: center;
`;

export const Balance = styled.div`
  color: var(--color-accent);
`;

export const DepositAddress = styled.span`
  color: var(--color-primaryLight);
  font-size: var(--font-size-s);
`;

export const DepositAddressContainer = styled.div`
  background-color: black;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  padding: 0.5rem;
`;

/** CASHIER */

export const CashierButton = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 0.5rem;
  z-index: 998;
`;

/** WITHDRAW */

export const ErrorMessage = styled.div`
  color: var(--color-danger);
  font-size: var(--font-size-xs);
  height: 1rem;
`;

export const InputWrapper = styled.div`
  margin-top: 1rem;
`;

export const SuccessMessage = styled.div`
  color: ${p =>
    p.status == Status.Success
      ? "var(--color-accent)"
      : p.status == Status.Processing
      ? "var(--color-lightGray)"
      : "var(--color-danger)"};
  font-size: var(--font-size-m);

  & > p {
    font-size: var(--font-size-m);
  }
`;
