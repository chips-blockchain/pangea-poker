import { DispatchContext, StateContext } from "../../../store/context";
import { useCallback, useContext, useState } from "react";

import { IState } from "../../../store/types";
import Option from "./Option";
import { chooseGameOption } from "../../../store/actions";
import { gameOptions } from "../../../lib/constants";
import styled from "@emotion/styled";

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
    [gameOptions.sitout]: Boolean(state.gameOptions.sitout),
    [gameOptions.leaveTable]: Boolean(state.gameOptions.leaveTable)
    // [gameOptions.foldAny]: gameOptions.foldAny
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
      {!checked[gameOptions.leaveTable] && (
        <Option
          onChange={handleOptionSelection}
          checked={checked[gameOptions.sitout]}
          text={gameOptions.sitout}
        />
      )}
      {!checked[gameOptions.sitout] && (
        <Option
          onChange={handleOptionSelection}
          checked={checked[gameOptions.leaveTable]}
          text={gameOptions.leaveTable}
        />
      )}

      {/* <Option onClick={(e) => handleOptionSelection(e)} text={constants.FOLD_ANY} /> */}
    </Container>
  );
};

export default AutomaticOptions;
