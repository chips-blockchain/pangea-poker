import styled from "@emotion/styled";
import Option from "./Option";
import { gameOptions } from "../../../lib/constants";
import { useCallback, useContext, useState } from "react";
import { DispatchContext, StateContext } from "../../../store/context";
import { chooseGameOption } from "../../../store/actions";
import { IState } from "../../../store/types";

const Container = styled.div`
  height: 75px;
  width: 205px;
  position: absolute;
  bottom: 1.75rem;
  left: 25rem;
  background-color: var(--color-almostBlack);
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-chipsTeal);
  box-sizing: border-box;
  border-radius: 4px;
`;

const AutomaticOptions: React.FunctionComponent = () => {
  const dispatch: (arg: object) => void = useContext(DispatchContext);
  const state: IState = useContext(StateContext);
  const [checked, setChecked] = useState({
    [gameOptions.sitout]: false
    // [gameOptions.foldAny]: false,
    // [gameOptions.leaveTable]: false
  });

  const handleOptionSelection = useCallback(
    (e): void => {
      const option = { [e.target.className]: e.target.checked };
      chooseGameOption(option, dispatch, state);
      setChecked({ ...checked, ...option });
    },
    [setChecked]
  );

  return (
    <Container>
      <Option
        onChange={handleOptionSelection}
        checked={checked[gameOptions.sitout]}
        text={gameOptions.sitout}
      />
      {/* <Option onClick={(e) => handleOptionSelection(e)} text={constants.FOLD_ANY} /> */}
      {/* <Option onClick={(e) => handleOptionSelection(e)} text={constants.LEAVE_TABLE} /> */}
    </Container>
  );
};

export default AutomaticOptions;
