import React, { useReducer } from "react";
import initialState from "./initialState";
import reducer from "./reducer";

import { StateContext, DispatchContext } from "./context";
import { IState } from "./types";

const ContextProvider = props => {
  const [state, dispatch]: [IState, Function] = useReducer(
    reducer,
    initialState
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default ContextProvider;
