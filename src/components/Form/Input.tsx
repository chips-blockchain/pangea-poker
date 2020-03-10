import React from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/core";
import Label from "./Label";

export interface IProps {
  defaultValue?: string;
  customStyle?: SerializedStyles;
  name: string;
  label?: string;
  onChange?: React.ChangeEventHandler;
  placeholder?: string;
  required?: boolean;
  type: string;
  value?: number;
}

export const inputStyle = css`
  background: none;
  border: 1px solid var(--color-primary);
  color: white;
  font-family: var(--font-family-secondary);
  font-weight: 500;
  max-width: 14rem;
  padding: 0.5rem 0.25rem;
  margin: 0.5rem;
  text-align: center;
  width: 100%;

  &:focus {
    border: 1px solid var(--color-accent);
  }
`;

const InputWrapper = styled.div`
  padding: 0.5rem;
`;

const Input: React.FunctionComponent<IProps> = ({
  customStyle,
  defaultValue,
  label,
  name,
  onChange,
  placeholder,
  required,
  type,
  value
}) => {
  return (
    <InputWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      <input
        css={css`
          ${inputStyle}
          ${customStyle}
        `}
        defaultValue={defaultValue}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        required={required}
        type={type}
      />
    </InputWrapper>
  );
};

export default Input;
