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

    expect(wrapper.find(`[label="1/2 Pot"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Pot"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Max"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Fold"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Call"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Raise to"]`)).toHaveLength(1);
    expect(wrapper.find("Slider")).toHaveLength(1);
  });

  test("shows the Call amount on the Call button when raise is not All-In", () => {
    const state = testState;
    state.toCall = 100;
    const wrapper = buildWrapper(state);

    expect(wrapper.find(`[label="Call"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Call"]`).text()).toBe("Call 100");
  });

  test("shows the Raise amount on the Raise button when raise is not All-In", () => {
    const state = testState;
    state.minRaiseTo = 100;
    const wrapper = buildWrapper(state);

    expect(wrapper.find(`[label="Raise to"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Raise to"]`).text()).toBe("Raise to 100");
  });

  test("shows All-In button instead of Raise button when raise would be an all in", () => {
    // The player's stack is 200
    const state = testState;

    // Minimum raise is more than the player's stack
    state.minRaiseTo = 300;
    let wrapper = buildWrapper(state);

    expect(wrapper.find(`[label="Raise to"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="All-In"]`)).toHaveLength(1);

    // Minimum raise is equals the player's stack
    state.minRaiseTo = 200;
    wrapper = buildWrapper(state);

    expect(wrapper.find(`[label="Raise to"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="All-In"]`)).toHaveLength(1);
  });

  test("does not show the Raise button when Call is already All-In", () => {
    // The player's stack is 200
    const state = testState;
    // Call is equal to the stack
    state.toCall = 200;
    let wrapper = buildWrapper(state);

    expect(wrapper.find(`[label="Raise to"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="All-In"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="Bet"]`)).toHaveLength(0);

    // Call is larger than the stack
    state.toCall = 300;
    wrapper = buildWrapper(state);

    expect(wrapper.find(`[label="Raise to"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="All-In"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="Bet"]`)).toHaveLength(0);
  });
});
