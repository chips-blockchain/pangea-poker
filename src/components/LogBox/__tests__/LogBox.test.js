import React from "react";
import { mount } from "enzyme";
import { LogBox } from "../LogBox";
import { StateContext } from "../../../store/context";
import testState from "../../../store/testState";

describe("LogBox", () => {
  const buildWrapper = stateToTest => {
    return mount(
      <StateContext.Provider value={stateToTest}>
        <LogBox handHistory={stateToTest.handHistory} />
      </StateContext.Provider>
    );
  };

  // Mock scrollIntoView so it's not undefined when testing
  const scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

  test("displays the LogBox with logs in order", () => {
    const state = testState;
    const wrapper = buildWrapper(state);
    const { handHistory } = state;

    expect(wrapper.exists(`section`)).toEqual(true);
    expect(wrapper.find(`Log`)).toHaveLength(handHistory.length);
    expect(
      wrapper
        .find(`Log`)
        .at(0)
        .html()
    ).toContain(handHistory[0].action);
    expect(
      wrapper
        .find(`Log`)
        .at(2)
        .html()
    ).toContain(handHistory[2].action);
  });

  test("scrolls the Logs into view", () => {
    buildWrapper(testState);
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});
