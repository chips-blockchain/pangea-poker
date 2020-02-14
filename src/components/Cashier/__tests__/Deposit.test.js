import React from "react";
import { mount } from "enzyme";
import Deposit from "../Deposit";
import { StateContext, DispatchContext } from "../../../store/context";
import initialState from "../../../store/initialState";

const dispatch = jest.fn();
const closeCashierModal = jest.fn();

const buildWrapper = (dispatch, state) => {
  return mount(
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Deposit
          state={state}
          dispatch={dispatch}
          closeCashierModal={closeCashierModal}
        />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

describe("Deposit", () => {
  test("displays correct CHIPS balance", () => {
    const state = { ...initialState, isCashierOpen: true, balance: 8 };
    const wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper.find(`div[data-test="balance-cashier-deposit"]`).text()
    ).toBe("Available CHIPS: 8.00000000");
  });

  test("displays correct deposit address", () => {
    const state = {
      ...initialState,
      depositAddress: "123456789a123456789a123456789a1234"
    };
    const wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper.find(`span[data-test="address-cashier-deposit"]`).text()
    ).toBe("123456789a123456789a123456789a1234");
  });

  test("displays the error message for invalid addresses", () => {
    const state = {
      ...initialState,
      depositAddress: "123456789a123456789a123456789a1234*"
    };
    const wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper.find(`span[data-test="address-cashier-deposit"]`).text()
    ).toBe("Invalid address");
  });

  test("Copies the deposit address to the clipboard after clicking on the address bar", () => {
    const depositAddress = "123456789a123456789a123456789a1234";
    const state = {
      ...initialState,
      depositAddress
    };
    const wrapper = buildWrapper(dispatch, state);

    navigator.clipboard = { writeText: jest.fn() };

    wrapper
      .find(`div[data-test="address-container-cashier-deposit"]`)
      .simulate("click");
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(depositAddress);
  });

  test("Does not copy the deposit address to the clipboard when the address is invalid", () => {
    const depositAddress = "123456789a123456789a123456789a1234*";
    const state = {
      ...initialState,
      depositAddress
    };
    const wrapper = buildWrapper(dispatch, state);

    navigator.clipboard = { writeText: jest.fn() };

    wrapper
      .find(`div[data-test="address-container-cashier-deposit"]`)
      .simulate("click");
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(0);
  });

  test("Closes the cashier modal when clicking close button", () => {
    const state = {
      ...initialState
    };
    const wrapper = buildWrapper(dispatch, state);

    wrapper.find(`[data-test="close-cashier-deposit"]`).simulate("click");
    expect(closeCashierModal).toHaveBeenCalled();
  });
});
