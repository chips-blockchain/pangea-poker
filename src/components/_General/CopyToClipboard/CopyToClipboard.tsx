import React, { useRef } from "react";
import { ICopyProps } from "../../Cashier/types";
import styled from "@emotion/styled";
import "./tooltip.css";

import copyIcon from "./copyToClipboard.svg";
import ReactTooltip from "react-tooltip";

const COPIED = 'Copied!'
const IconWrapper = styled.div`
  cursor: pointer;
`;

export interface ICopyProps {
  textToCopy: string;
}

const CopyToClipboard: React.FunctionComponent<ICopyProps> = ({
  textToCopy
}) => {
  const idRef = useRef(null);

  const copy = () => (): void => {
    ReactTooltip.show(idRef.current);
    navigator.clipboard.writeText(String(textToCopy));
  };

  return (
    <IconWrapper data-test="clipboard" onClick={copy()}>
      <div data-tip={COPIED} ref={idRef} />
      <img src={copyIcon} onClick={copy()} />
      <ReactTooltip
        className="react-tooltip"
        event="click"
        eventOff="blur"
        delayShow={100}
        delayHide={1000}
        afterShow={ReactTooltip.hide()}
      />
    </IconWrapper>
  );
};

export default CopyToClipboard;
