import React from "react";
import Input, { IProps } from "./Input";
import { Button } from "../Controls/";
import { customInputStyle, customButtonStyle, Wrapper } from "./css/style";

interface IInputWIthButtonProps extends IProps {
  handleButtonClick: () => void;
  buttonLabel: string;
  onBlur: React.ChangeEventHandler;
}

const InputWithButton: React.FunctionComponent<IInputWIthButtonProps> = ({
  forwardRef,
  buttonLabel,
  handleButtonClick,
  label,
  max,
  min,
  name,
  onChange,
  onBlur,
  placeholder,
  required,
  step,
  type,
  value
}) => {
  return (
    <Wrapper>
      <Input
        data-test="input-with-button-input"
        customStyle={customInputStyle}
        forwardRef={forwardRef}
        label={label}
        max={max}
        min={min}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        step={step}
        type={type}
        value={value}
      />
      <Button
        data-test="input-with-button-button"
        label={buttonLabel}
        small
        customStyle={customButtonStyle}
        onClick={handleButtonClick}
      />
    </Wrapper>
  );
};

export default InputWithButton;
