import { useReducer } from "react";
import { StateContext, DispatchContext } from "../store/context";
import initialState from "../store/initialState";
import { IState } from "../store/types";
import reducer from "../store/reducer";

const TestStateProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch]: [IState, Function] = useReducer(
    reducer,
    initialState
  );
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default TestStateProvider;
