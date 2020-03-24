import React from "react";
import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/core";
import Label from "./Label";

export interface IProps {
  defaultValue?: string;
  customStyle?: SerializedStyles;
  forwardRef: (ref: object) => void;
  name: string;
  max?: number;
  min?: number;
  label?: string;
  onChange?: React.ChangeEventHandler;
  onBlur: React.ChangeEventHandler;
  placeholder?: string;
  required?: boolean;
  type: string;
  step?: number;
  value?: number | string;
}

export const inputStyle = css`
  appearance: none;
  background: none;
  border: 1px solid var(--color-primary);
  color: white;
  font-family: var(--font-family-secondary);
  font-weight: 500;
  max-width: 14rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  text-align: center;
  width: 100%;

  &:focus {
    border: 1px solid var(--color-accent);
    outline: none;
  }

  /* Hide the up and down arrows for number input */
  &[type="number"]::-webkit-inner-spin-button {
    opacity: 0;
  }
`;

const InputWrapper = styled.div`
  padding: 0.5rem;
`;

const Input: React.FunctionComponent<IProps> = ({
  customStyle,
  defaultValue,
  forwardRef,
  label,
  max,
  min,
  name,
  onBlur,
  onChange,
  placeholder,
  required,
  step,
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
        max={max}
        min={min}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        ref={forwardRef}
        step={step}
        required={required}
        type={type}
        value={value}
      />
    </InputWrapper>
  );
};

export default Input;
