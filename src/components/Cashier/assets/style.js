import styled from "@emotion/styled";

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
`;

export const Balance = styled.div`
  color: var(--color-accent);
`;

export const DepositAddress = styled.span`
  color: var(--color-primaryLight);
  font-size: var(--font-size-s);
`;

export const DepositAddressContainer = styled.div`
  background-color: var(--darkGrey);
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  padding: 0.5rem;
`;

/** CASHIER */

export const CashierButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  z-index: 998;
`;

/** WITHDRAW */

export const ErrorMessage = styled.div`
  color: var(--color-accent);
  font-size: var(--font-size-xs);
`;

export const InputWrapper = styled.div`
  margin-top: 1rem;
`;

export const SuccessMessage = styled.div`
  color: var(--color-primaryLight);
  padding-top: 2rem;
  & > div {
    font-size: 4rem;
    padding-bottom: 1rem;
  }
`;
