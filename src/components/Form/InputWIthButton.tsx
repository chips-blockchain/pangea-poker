import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Input, { IProps } from "./Input";
import { Button } from "../Controls/";

interface IInputWIthButtonProps extends IProps {
  test?: string;
}

const customInputStyle = css`
  appearance: none;
  -moz-appearance: textfield;
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
  label,
  name,
  onChange,
  placeholder,
  required,
  type
}) => {
  return (
    <Wrapper>
      <Input
        customStyle={customInputStyle}
        label={label}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
      />
      <Button label="Max" small customStyle={customButtonStyle} />
    </Wrapper>
  );
};

export default InputWithButton;
