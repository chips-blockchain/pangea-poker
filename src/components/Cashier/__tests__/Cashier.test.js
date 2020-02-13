import React from "react";
import { mount } from "enzyme";
import Cashier from "../Cashier";
import { StateContext, DispatchContext } from "../../../store/context";
import initialState from "../../../store/initialState";
import * as actions from "../../../store/actions";

const dispatch = jest.fn();

const buildWrapper = (dispatch, state) => {
  return mount(
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div id="root">
          <Cashier state={state} dispatch={dispatch} />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

describe("Cashier", () => {
  test("is shown", () => {
    const state = { ...initialState, isCashierOpen: true };
    const wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper
        .find(`#cashier-modal`)
        .first()
        .prop("isOpen")
    ).toBe(true);
  });

  test("is hidden", () => {
    const state = { ...initialState, isCashierOpen: false };
    const wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper
        .find(`#cashier-modal`)
        .first()
        .prop("isOpen")
    ).toBe(false);
  });

  test("is closed when close button is clicked on Deposit tab", () => {
    const state = { ...initialState, isCashierOpen: true };
    const wrapper = buildWrapper(dispatch, state);
    jest.spyOn(actions, "updateStateValue");
    const { updateStateValue } = actions;

    expect(
      wrapper
        .find(`#cashier-modal`)
        .first()
        .prop("isOpen")
    ).toBe(true);

    wrapper.find(`[data-test="close-cashier-deposit"]`).simulate("click");
    expect(updateStateValue).toHaveBeenCalled();
    expect(updateStateValue).toHaveBeenCalledWith(
      "isCashierOpen",
      false,
      dispatch
    );
  });
});
