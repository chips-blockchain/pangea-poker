import * as actions from "../../../store/actions";

import { DispatchContext, StateContext } from "../../../store/context";

import React from "react";
import Table from "../../Table";
import { mount } from "enzyme";
import testState from "../../../store/testState";

/************** MOCKS and SPIES **************/

const dispatch = jest.fn();

jest.spyOn(actions, "chooseGameOption");
const { chooseGameOption } = actions;

const scrollIntoViewMock = jest.fn();
HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

/********************************************/

const buildWrapper = (dispatch, state) => {
  return mount(
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Table />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

/**
 * [x] The Game options are NOT displayed before the player chooses a seat
 * [x] The Game options are displayed when the player chooses a seat
 * [x] If the player checks the checkbox the request is sent to the backends
 * [x] If the controls are displayed the game options are not displayed and vice versa
 */
describe("Options test", () => {
  test("The Game options are NOT displayed before the player chooses a seat", () => {
    const state = { ...testState, isStartupModal: false, userSeat: null };
    const wrapper = buildWrapper(dispatch, state);
    actions.setUserSeat(null, dispatch);
    expect(wrapper.exists(`#automatic-options`)).toEqual(false);
  });

  test("The Game options are displayed when the player chooses a seat", () => {
    const state = { ...testState, isStartupModal: false };
    const wrapper = buildWrapper(dispatch, state);
    expect(wrapper.exists(`#automatic-options`)).toEqual;
  });

  test("If the player checks the checkbox the request is sent to the backend", () => {
    const state = { ...testState, isStartupModal: false };
    const wrapper = buildWrapper(dispatch, state);
    expect(wrapper.exists({ type: "checkbox" })).toEqual(true);
    let checkbox = wrapper.find({ type: "checkbox" }).first();
    expect(checkbox.props().checked).toEqual(false);
    checkbox.simulate("change");
    expect(chooseGameOption).toHaveBeenCalled();
  });

  test("If the controls are displayed the game options are not displayed and vice versa", () => {});
});
