import styled from "@emotion/styled";
import { Status } from "../../../lib/constants";

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
