import styled from "@emotion/styled";

interface IProps {
  text: string;
  onClick: (e: MouseEvent) => void;
}

const StyledOption = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.25rem;
  p {
    // font-size: var(--font-size-xs);
    color: var(--color-superLightGray);
    margin: 0 0 0 0.5rem;
  }
`;

const Option: React.FunctionComponent<IProps> = ({ text, onClick }) => {
  return (
    <StyledOption>
      <input className={text} onClick={e => onClick(e)} type="checkbox"></input>
      <p>{text}</p>
    </StyledOption>
  );
};

export default Option;
