import React, { useRef } from "react";
import { ICopyProps } from "./types";
import styled from "@emotion/styled";
import "./assets/tooltip.css";

import copyIcon from "./assets/copyToClipboard.svg";
import ReactTooltip from "react-tooltip";

const IconWrapper = styled.div`
  cursor: pointer;
`;

const CopyToClipboard: React.FunctionComponent<ICopyProps> = ({
  textToCopy
}) => {
  const idRef = useRef(null);

  const copy = () => (): void => {
    ReactTooltip.show(idRef.current);
    navigator.clipboard.writeText(String(textToCopy));
  };

  return (
    <IconWrapper onClick={copy()}>
      <div data-tip={"Copied!"} ref={idRef} />
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
