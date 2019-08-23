import { StateContext } from "../store/context";
import state from "../store/initialState";

const StateProvider = ({ children }) => {
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
