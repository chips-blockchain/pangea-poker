import React from "react";
import { mount } from "enzyme";
import Controls from "../Controls";
import { StateContext } from "../../../store/context";
import initialState from "../../../store/initialState";

describe("Controls", () => {
  initialState.userSeat = "player1";
  const buildWrapper = stateToTest => {
    return mount(
      <StateContext.Provider value={stateToTest}>
        <Controls />
      </StateContext.Provider>
    );
  };

  test("displays all the controls by default", () => {
    const state = initialState;
    const wrapper = buildWrapper(state);

    expect(wrapper.find(`[label="1/2 Pot"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Pot"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Max"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Fold"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Call"]`)).toHaveLength(1);
    expect(wrapper.find(`[label="Raise to"]`)).toHaveLength(1);
    expect(wrapper.find("Slider")).toHaveLength(1);
  });
});
