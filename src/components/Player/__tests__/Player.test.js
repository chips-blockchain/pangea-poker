import React from "react";
import { mount } from "enzyme";
import { StateContext, DispatchContext } from "../../../store/context";
import testState from "../../../store/testState";
import Player from "../Player";

const dispatch = jest.fn();

const buildWrapper = (dispatch, state) => {
  return mount(
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Player connected chips={1000} seat="player1" isActive />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

describe("Player", () => {
  test("is highlighted when active", () => {
    const state = {
      ...testState,
      userSeat: "player1"
    };
    const wrapper = buildWrapper(dispatch, state);

    expect(wrapper.find(`[data-test="player-highlight"]`).exists()).toEqual(
      true
    );
  });

  test("is dispalying the timer when active", () => {
    const state = {
      ...testState,
      userSeat: "player1"
    };
    const wrapper = buildWrapper(dispatch, state);

    expect(wrapper.find(`[data-test="player-timer-bar"]`).exists()).toEqual(
      true
    );
  });
});
