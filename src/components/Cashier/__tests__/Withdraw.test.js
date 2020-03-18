import React from "react";
import { mount } from "enzyme";
import Withdraw from "../Withdraw";
import { StateContext, DispatchContext } from "../../../store/context";
import initialState from "../../../store/initialState";

const dispatch = jest.fn();
const closeCashierModal = jest.fn();

const cashierState = { ...initialState, isCashierOpen: true };

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

const createWrapper = stateChanges => {
  const state = {
    ...cashierState,
    ...stateChanges
  };
  return buildWrapper(dispatch, state);
};

describe("Deposit", () => {
  // - [X] Withdraw renders
  // - [X] Displays available CHIPS
  // - [X] There is an amount to input number input field
  // - [X] There is a Max button
  // - [X] Max button updates the amount
  // - [X] It shows an address selector dropdown
  // - [X] You can select from the dropdown
  // - [X] All of the addressess pass the validation
  // - [ ] Amount cannot be more than the chips
  // - [ ] Amount is a valid bitcoin amount
  // - [ ] Shows the error message where it should
  // - [X] Cancel button renders
  // - [X] Cancel button closes the modal
  // - [ ] Withdraw button renders
  // - [ ] There is a confirmation before the Withdraw happens
  // - [ ] Withdraws the moneys
  // - [ ] There is a confirmation that the withdraw happened

  test("Renders the withdraw tab", () => {
    const wrapper = createWrapper();
    expect(wrapper.find(`form[data-test="withdraw-tab"]`)).toHaveLength(1);
  });

  test("displays correct CHIPS balance", () => {
    const wrapper = createWrapper({ balance: 9 });

    expect(wrapper.find(`div[data-test="withdraw-balance"]`)).toHaveLength(1);
    expect(wrapper.find(`div[data-test="withdraw-balance"]`).text()).toBe(
      "Available CHIPS: 9.00000000"
    );
  });

  test("displays correct CHIPS balance", () => {
    const wrapper = createWrapper({ balance: 9 });

    expect(wrapper.find(`div[data-test="withdraw-balance"]`)).toHaveLength(1);
    expect(wrapper.find(`div[data-test="withdraw-balance"]`).text()).toBe(
      "Available CHIPS: 9.00000000"
    );
  });

  test("displays the amount selector", () => {
    const wrapper = createWrapper();

    expect(wrapper.find(`InputWithButton`)).toHaveLength(1);
    expect(wrapper.find(`InputWithButton input`).props().value).toEqual(
      "0.00000000"
    );
  });

  test("handles clicking on the max button", () => {
    const balance = "0.12345678";
    const wrapper = createWrapper({ balance });

    expect(wrapper.find(`InputWithButton Button`)).toHaveLength(1);
    wrapper.find(`InputWithButton Button`).simulate("click");
    expect(wrapper.find(`InputWithButton input`).props().value).toEqual(
      balance
    );
  });

  test("displays the address selector", () => {
    const withdrawAddressList = [
      "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      "1XPTgDRhN8RFnzniWCddobD9iKZatrvH4"
    ];
    const wrapper = createWrapper({ withdrawAddressList });

    expect(wrapper.find(`[data-test="withdraw-address-list"]`)).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="withdraw-address-list"]`).props().options
    ).toEqual(withdrawAddressList);
  });

  test("Closes the cashier modal when clicking close button", () => {
    const wrapper = createWrapper();

    wrapper
      .find(`[data-test="close-button-cashier-withdraw"]`)
      .simulate("click");
    expect(closeCashierModal).toHaveBeenCalled();
  });
});
