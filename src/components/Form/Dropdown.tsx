import React from "react";
import { DropdownWrapper, dropdownStyle } from "./css/style";
import Label from "./Label";

interface IProps {
  forwardRef?: (ref: object) => void;
  name: string;
  label?: string;
  onChange?: React.ChangeEventHandler;
  options?: string[];
  required?: boolean;
}

const Dropdown: React.FunctionComponent<IProps> = ({
  forwardRef,
  label,
  name,
  onChange,
  options,
  required
}) => {
  return (
    <DropdownWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      <select
        css={dropdownStyle}
        name={name}
        id={name}
        onChange={onChange}
        required={required}
        ref={forwardRef}
      >
        {options.map(option => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </DropdownWrapper>
  );
};

export default Dropdown;
