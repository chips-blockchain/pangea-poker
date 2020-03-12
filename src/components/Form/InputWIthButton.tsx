import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Input, { IProps } from "./Input";
import { Button } from "../Controls/";

interface IInputWIthButtonProps extends IProps {
  handleButtonClick: () => void;
}

const customInputStyle = css`
  padding: 0.5rem 2.25rem 0.5rem 1rem;
`;

const customButtonStyle = css`
  position: absolute;
  height: 1.25rem;
  width: 2rem;
  top: 32;
  right: 48;
`;

const Wrapper = styled.div`
  position: relative;
`;

const InputWithButton: React.FunctionComponent<IInputWIthButtonProps> = ({
  forwardRef,
  handleButtonClick,
  label,
  name,
  onChange,
  placeholder,
  required,
  type,
  value
}) => {
  return (
    <Wrapper>
      <Input
        customStyle={customInputStyle}
        forwardRef={forwardRef}
        label={label}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      <Button
        label="Max"
        small
        customStyle={customButtonStyle}
        onClick={handleButtonClick}
      />
    </Wrapper>
  );
};

export default InputWithButton;
