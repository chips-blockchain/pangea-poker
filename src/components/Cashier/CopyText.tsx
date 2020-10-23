import React, { useEffect, useState } from "react";
import { ICopyProps } from "./types";
import ReactTooltip from "react-tooltip";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import "./assets/tooltip.css";
import { COPY, COPIED } from "./assets/constants";

const CopyText: React.FunctionComponent<ICopyProps> = ({ textToCopy }) => {
  const [isTextCopied, setIsTextCopied] = useState(false);
  const [text, setText] = useState(textToCopy);

  useEffect(() => {
    if (text && text.length > 35) {
      setText(text.substr(0, 35) + "...");
    }
  }, [text]);

  // Copy the text to the clipboard and hide the tooltip when clicked
  const copyToClipBoard = () => (): void => {
    console.log(textToCopy);
    navigator.clipboard.writeText(String(textToCopy));
    setIsTextCopied(true);
    ReactTooltip.hide();
  };

  const TextContainer = styled.div`
    background-color: black;
    border: 1px solid var(--color-primary);
    border-radius: 4px;
    padding: 0.5rem;
    margin: auto;
    color: var(--color-primaryLight);
    font-size: var(--font-size-s);
  `;
  return (
    <div>
      <TextContainer
        data-tip={isTextCopied ? COPIED : COPY}
        onClick={copyToClipBoard()}
        data-test="copy-text-container"
      >
        <div
          css={css`
            cursor: pointer;
          `}
          id="textToCopy"
        >
          {text}
        </div>
      </TextContainer>
      <ReactTooltip className="react-tooltip" />
    </div>
  );
};

export default CopyText;
