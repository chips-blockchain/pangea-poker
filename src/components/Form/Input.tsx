import React from "react";
import { css, SerializedStyles } from "@emotion/core";
import "./assets/style.css";
import { inputStyle, InputWrapper } from "./assets/style";

export interface IProps {
  defaultValue?: string;
  customStyle?: SerializedStyles;
  forwardRef: (ref: object) => void;
  name: string;
  max?: number;
  min?: number;
  label?: string;
  customLabelStyle?: SerializedStyles;
  onChange?: React.ChangeEventHandler;
  onBlur?: React.ChangeEventHandler;
  placeholder?: string;
  required?: boolean;
  type: string;
  step?: number;
  value?: number | string;
}

const Input: React.FunctionComponent<IProps> = ({
  customStyle,
  defaultValue,
  forwardRef,
  label,
  customLabelStyle,
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
      {label && (
        <label
          css={css`
            ${customLabelStyle}
          `}
          htmlFor={name}
        >
          {label}
        </label>
      )}
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
