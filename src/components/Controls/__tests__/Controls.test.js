import React from "react";
import { mount } from "enzyme";
import Controls from "../Controls";
import { StateContext } from "../../../store/context";
import testState from "../../../store/testState";

describe("Controls", () => {
  const buildWrapper = stateToTest => {
    return mount(
      <StateContext.Provider value={stateToTest}>
        <Controls />
      </StateContext.Provider>
    );
  };

  test("displays all the controls by default", () => {
    const state = testState;
    const wrapper = buildWrapper(state);

    expect(
      wrapper.find(`[data-test="table-controls-half-pot-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-pot-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-max-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-fold-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-check/call-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`)
    ).toHaveLength(1);
    expect(wrapper.find("Slider")).toHaveLength(1);
  });

  test("shows the Call button and the call amount", () => {
    const state = testState;
    state.toCall = 100;
    state.controls.canCheck = false;
    const wrapper = buildWrapper(state);

    expect(
      wrapper.find(`[data-test="table-controls-check/call-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-check/call-button"]`).text()
    ).toBe("Call 100");
  });

  test("shows the Raise button with the amount when Raise is not All-In", () => {
    const state = testState;
    state.minRaiseTo = 100;
    state.controls.canRaise = true;
    const wrapper = buildWrapper(state);

    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`).text()
    ).toBe("Raise to 100");
  });

  test("shows the Check button instead of the Call button", () => {
    const state = testState;
    state.toCall = 100;
    state.controls.canCheck = true;
    const wrapper = buildWrapper(state);

    expect(
      wrapper.find(`[data-test="table-controls-check/call-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-check/call-button"]`).text()
    ).toBe("Check ");
  });

  test("hides the Raise/All-In button", () => {
    const state = testState;
    state.controls.canRaise = false;
    const wrapper = buildWrapper(state);

    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`)
    ).toHaveLength(0);
  });

  test("shows All-In button instead of Raise button when raise would be an all in", () => {
    // The player's stack is 200
    const state = testState;

    // Minimum raise is more than the player's stack
    state.minRaiseTo = 300;
    state.controls.canRaise = true;
    let wrapper = buildWrapper(state);

    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`).text()
    ).toBe("All-In 200");

    // Minimum raise is equals the player's stack
    state.minRaiseTo = 200;
    wrapper = buildWrapper(state);

    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`).text()
    ).toBe("All-In 200");
  });
});
