import styled from "@emotion/styled";

const effs = ` 
&:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  cursor: pointer;
};
&:focus {
  color: var(--color-accent);
  border-color: var(--color-accent);
};
&:active {
  background: var(--color-accent);
  color: var(--color-background);
}
`;
export const ButtonStyle = styled.button`
  background: var(--color-background);
  border: 0.0625rem solid var(--color-primary);
  border-radius: 0.125rem;
  color: var(--color-text);
  font-size: ${props => (props.small ? ".75rem" : "1rem")};
  font-weight: 700;
  height: ${props => (props.small ? "1.75rem" : "2.5rem")};
  margin-right: 0.25rem;
  opacity: ${props => props.disabled && "0.5"};
  line-height: 1rem;
  transition: 0.1s ease;
  width: ${props => (props.small ? "3.625rem" : "7.5rem")};
  cursor: ${props => (props.disabled ? "not-allowed;" : "{}")};
  ${props => (!props.disabled ? effs : "")};
`;

const hover = `{
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-background);
}`;
export const highlightedButtonStyle = styled.div`
  background: var(--color-primaryLight);
  border-color: var(--color-primaryLight);
  color: var(--color-background);
  &:hover: ${props => (!props.disabled ? hover : "{}")};
  &:active {
    border-color: var(--color-primary);
  }
`;

const before = `
{
  content: "";
  display: block;
  height: 0;
  width: 0;
  margin-top: 0.75rem;
} 
`;

export const ButtonInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    font-family: var(--font-family-secondary);
    text-align: center;
    justify-content: center;
    /* Crop line height */
    &:before: ${props => (props.amount ? before : "{}")};
  `;

export const SliderContainer = styled.div`
  margin: 0rem 0rem 0.25rem 0rem;
`;

export const SliderWrapper = styled.div`
  align-items: center;
  background: var(--color-background);
  border: 0.0625rem solid var(--color-primary);
  display: inline-block;
  display: flex;
  border-radius: 0.125rem;
  height: 1.6rem;
  justify-content: flex-start;
  width: 180px;
`;
