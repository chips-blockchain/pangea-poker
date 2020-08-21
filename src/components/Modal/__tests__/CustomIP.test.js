import React from "react";
import { mount } from "enzyme";
import CustomIP from "../CustomIP";
import { StateContext, DispatchContext } from "../../../store/context";
import testState from "../../../store/testState";
import * as actions from "../../../store/actions";

const dispatch = jest.fn();

jest.spyOn(actions, "connectPlayer");
jest.spyOn(actions, "game");
jest.spyOn(actions, "setUserSeat");
jest.spyOn(actions, "updateStateValue");

const { updateStateValue, connectPlayer, game, setUserSeat } = actions;

describe("CustomIP", () => {
  const buildWrapper = stateToTest => {
    return mount(
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={stateToTest} dispatch={dispatch}>
          <CustomIP />
        </StateContext.Provider>
      </DispatchContext.Provider>
    );
  };

  test("Displays the tabs", () => {
    const state = { ...testState };
    const wrapper = buildWrapper(state);

    expect(wrapper.find(`li[data-test="tab-player"]`)).toHaveLength(1);
    expect(wrapper.find(`li[data-test="tab-dealer"]`)).toHaveLength(1);
  });

  test("Handles tab switching properly", () => {
    const state = { ...testState };
    const wrapper = buildWrapper(state);

    // DCV by deafult
    expect(wrapper.find(`input[name="dcv"]`)).toHaveLength(1);
    expect(wrapper.find(`input[name="player"]`)).toHaveLength(0);

    // Switch to player
    wrapper.find(`Tab[data-test="tab-player"]`).simulate("click");
    expect(wrapper.find(`input[name="player"]`)).toHaveLength(1);
    expect(wrapper.find(`input[name="dcv"]`)).toHaveLength(0);
  });

  test("Proceeds correctly with the dealer node", () => {
    const state = { ...testState };
    const wrapper = buildWrapper(state);

    // Simulate the user inputting IP addresses
    wrapper.find(`input[name="dcv"]`).simulate("change", {
      target: { value: "1.2.3.4" }
    });

    // Click the Set Nodes button
    wrapper.find(`Button[data-test="set-nodes-button"]`).simulate("click");

    // Sets the nodeType in state
    expect(updateStateValue).toHaveBeenCalledWith(
      "nodeType",
      "dealer",
      dispatch
    );

    // Does not set the userSeat in state
    expect(setUserSeat).toHaveBeenCalledTimes(0);

    // Does not start the game
    expect(game).toHaveBeenCalledTimes(0);

    // Does not connect the opponent
    expect(connectPlayer).toHaveBeenCalledTimes(0);
  });

  test("Proceeds correctly with a player node", () => {
    const state = { ...testState };
    const wrapper = buildWrapper(state);

    // Switch to player tab
    wrapper.find(`li[data-test="tab-player"]`).simulate("click");

    // Simulate the user inputting IP addresses
    wrapper.find(`input[name="player"]`).simulate("change", {
      target: { value: "9.9.9.9" }
    });

    // Click the Set Nodes button
    wrapper.find(`Button[data-test="set-nodes-button"]`).simulate("click");

    // Sets the nodes in state
    expect(updateStateValue).toHaveBeenCalledWith(
      "nodes",
      { player: "9.9.9.9" },
      dispatch
    );

    // Sets the nodeType in state
    expect(updateStateValue).toHaveBeenCalledWith(
      "nodeType",
      "player",
      dispatch
    );
  });
});
