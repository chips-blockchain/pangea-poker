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

  test("does not show the Raise button when Call is already All-In", () => {
    // The player's stack is 200
    const state = testState;
    state.toCall = 200;
    const wrapper = buildWrapper(state);

    expect(wrapper.find(`[label="Raise to"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="All-In"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="Bet"]`)).toHaveLength(0);

    state.toCall = 300;
    expect(wrapper.find(`[label="Raise to"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="All-In"]`)).toHaveLength(0);
    expect(wrapper.find(`[label="Bet"]`)).toHaveLength(0);
  });
});
