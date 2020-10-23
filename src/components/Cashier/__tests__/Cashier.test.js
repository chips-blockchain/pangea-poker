import React from "react";
import { mount } from "enzyme";
import Cashier from "../Cashier";
import { StateContext, DispatchContext } from "../../../store/context";
import initialState from "../../../store/testState";
import * as actions from "../../../store/actions";

const dispatch = jest.fn();

jest.spyOn(actions, "updateStateValue");
const { updateStateValue } = actions;

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

  test("shows the cashier button for player nodes", () => {
    const state = {
      ...initialState,
      isCashierOpen: false,
      nodeType: "player",
      isStartupModal: false
    };
    const wrapper = buildWrapper(dispatch, state);

    expect(wrapper.find(`button[data-testid="cashier-button"]`)).toHaveLength(
      1
    );
  });
  
  // @TODO FIX THIS TEST
  // test("opens when the Cashier button is clicked", () => {
  //   const state = {
  //     ...initialState,
  //     isCashierOpen: false,
  //     nodeType: "player",
  //     isStartupModal: false,
  //     backendStatus: 1
  //   };
  //   const wrapper = buildWrapper(dispatch, state);

  //   wrapper.find(`button[data-testid="cashier-button"]`).simulate("click");
  //   expect(updateStateValue).toHaveBeenCalled();
  //   expect(updateStateValue).toHaveBeenCalledWith(
  //     "isCashierOpen",
  //     true,
  //     dispatch
  //   );
  // });
});
