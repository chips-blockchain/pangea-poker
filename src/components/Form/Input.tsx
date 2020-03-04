import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

interface IProps {
  defaultValue?: string;
  name: string;
  label?: string;
  onChange: React.ChangeEventHandler;
  placeholder?: string;
  type: string;
}

const Label = styled.label`
  color: var(--color-text);
  display: block;
  font-size: var(--font-size-s);
`;

const inputStyle = css`
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

export const Input: React.FunctionComponent<IProps> = ({
  defaultValue,
  label,
  name,
  onChange,
  placeholder,
  type
}) => {
  return (
    <InputWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      <input
        css={inputStyle}
        defaultValue={defaultValue}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </InputWrapper>
  );
};
