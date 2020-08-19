import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Level } from "../../../lib/constants";

/** Table Select */

export const Table = styled.table`
  border-spacing: 0;
  color: white;
  cursor: pointer;
  font-size: var(--font-size-s);
  text-align: center;
  width: 100%;

  tbody {
    padding: 0.5rem;

    & tr.selected {
      background-color: var(--color-primaryLight);
      color: var(--color-background);
      cursor: default;
    }

    & tr:hover:not(.selected) {
      background-color: var(--color-accent);
      color: var(--color-background);
    }
  }

  td {
    font-family: var(--font-family-secondary);
    font-weight: 400;
    padding: 0.25rem;
  }

  thead {
    & tr {
      background-color: var(--color-background);

      & th {
        padding-bottom: 0.25rem;
      }
    }
  }
`;

export const TableArea = styled.div`
  background-color: var(--color-darkGray);
  height: 14rem;
  overflow: scroll;
`;

export const ModalButtonsWrapper = styled.div`
  bottom: 2rem;
  left: 0;
  position: absolute;
  text-align: center;
  width: 100%;
`;

/** Modal */

export const modalStyle = {
  content: {
    backgroundColor: "var(--color-background)",
    border: 0,
    color: "var(--color-text)",
    left: "50%",
    opacity: 1,
    overflowX: "hidden",
    padding: "2rem 2rem",
    textAlign: "center",
    top: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "20rem",
    minHeight: "22.5rem",
    zIndex: 1000
  },
  overlay: {
    backgroundColor: "#0000007F",
    position: "absolute",
    height: "37.5rem",
    width: "50rem",
    zIndex: 999
  }
};

export const tabsStyle = css`
  & > .react-tabs__tab-list {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const noticeColors = {
  [Level.info]: "var(--color-text)",
  [Level.warning]: "var(--color-accent)",
  [Level.error]: "var(--color-danger)"
};

export const ConnectionStatus = styled.div`
  color: ${props => noticeColors[props.level]};
  font-size: var(--font-size-s);
`;
