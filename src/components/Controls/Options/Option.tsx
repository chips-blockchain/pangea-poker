import styled from "@emotion/styled";
import { ChangeEvent } from "react";

interface IProps {
  text: string;
  checked: boolean;
  onChange: (e: ChangeEvent) => void;
}

const StyledOption = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.25rem;
  p {
    color: var(--color-superLightGray);
    margin: 0 0 0 0.5rem;
  }
`;

const Option: React.FunctionComponent<IProps> = ({
  text,
  checked,
  onChange
}) => {
  return (
    <StyledOption>
      <input
        className={text}
        checked={checked}
        onChange={onChange}
        type="checkbox"
      ></input>
      <p>{text}</p>
    </StyledOption>
  );
};

export default Option;
