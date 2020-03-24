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

describe("Withdraw", () => {
  // - [X] Withdraw renders
  // - [X] Displays available CHIPS
  // - [X] There is an amount to input number input field
  // - [X] There is a Max button
  // - [X] Max button updates the amount
  // - [X] It shows an address selector dropdown
  // - [X] You can select from the dropdown
  // - [X] All of the addressess pass the validation
  // - [X] Withdraw button is disabled when nothing is selected
  // - [ ] Shows the error message where it should
  // - [X] Cancel button renders
  // - [X] Cancel button closes the modal
  // - [ ] Withdraw button renders
  // - [ ] There is a confirmation before the Withdraw happens
  // - [ ] Withdraws the moneys
  // - [ ] There is a confirmation that the withdraw happened
  // - [X] Amount can't be set to be bigger than the balance

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
    expect(wrapper.find(`InputWithButton input`).props().value).toEqual(0);
  });

  test("handles clicking on the max button", () => {
    const balance = 0.12345678;
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

  test("The withdraw button is disabled by default", () => {
    const wrapper = createWrapper();

    console.log(wrapper.debug());

    expect(
      wrapper.find(`Button[data-test="withdraw-button"]`).props()["disabled"]
    ).toBe(true);
  });

  test("Withdraw button is enabled when amount and withdraw address are set", () => {
    const wrapper = createWrapper({
      withdrawAddressList: [
        "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        "1XPTgDRhN8RFnzniWCddobD9iKZatrvH4"
      ]
    });

    wrapper.find(`input#withdraw-amount`).simulate("change");
    expect(
      wrapper.find(`Button[data-test="withdraw-button"]`).props()["disabled"]
    ).toBe(false);
  });

  test("Amount can't be set to be more than the balance ", () => {
    const wrapper = createWrapper({ balance: 1 });

    wrapper
      .find(`input#withdraw-amount`)
      .simulate("change", { target: { value: 2 } });
    wrapper.find(`input#withdraw-amount`).simulate("blur");
    expect(wrapper.find(`input#withdraw-amount`).props().value).toBe(1);
  });
});
