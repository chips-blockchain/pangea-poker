import React from "react";
import { mount } from "enzyme";
import Withdraw from "../Withdraw";
import { StateContext, DispatchContext } from "../../../store/context";
import initialState from "../../../store/initialState";

const dispatch = jest.fn();
const closeCashierModal = jest.fn();

const buildWrapper = (dispatch, state) => {
  return mount(
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Withdraw
          state={state}
          dispatch={dispatch}
          closeCashierModal={closeCashierModal}
        />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

describe("Deposit", () => {
  // - [X] Withdraw renders
  // - [ ] Displays available CHIPS
  // - [ ] There is an amount to input number input field
  // - [ ] There is a Max button
  // - [ ] Max button updates the amount
  // - [ ] It shows an address selector dropdown
  // - [ ] You can select from the dropdown
  // - [ ] All of the addressess pass the validation
  // - [ ] Amount cannot be more than the chips
  // - [ ] Amount is a valid bitcoin amount
  // - [ ] Shows the error message where it should
  // - [ ] Cancel button renders
  // - [ ] Cancel button closes the modal
  // - [ ] Withdraw button renders
  // - [ ] There is a confirmation before the Withdraw happens
  // - [ ] Withdraws the moneys
  // - [ ] There is a confirmation that the withdraw happened

  test("Renders the withdraw tab", () => {
    const state = { ...initialState, isCashierOpen: true };
    const wrapper = buildWrapper(dispatch, state);
    expect(wrapper.find(`form[data-test="withdraw-tab"]`)).toHaveLength(1);
  });
});
