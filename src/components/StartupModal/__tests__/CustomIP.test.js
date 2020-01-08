import React from "react";
import { mount } from "enzyme";
import CustomIP from "../CustomIP";
import { StateContext, DispatchContext } from "../../../store/context";
import testState from "../../../store/testState";
import * as actions from "../../../store/actions";

const dispatch = jest.fn();

jest.spyOn(actions, "closeStartupModal");
jest.spyOn(actions, "connectPlayer");
jest.spyOn(actions, "game");
jest.spyOn(actions, "setUserSeat");
jest.spyOn(actions, "updateStateValue");

const {
  updateStateValue,
  closeStartupModal,
  connectPlayer,
  game,
  setUserSeat
} = actions;

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

    expect(wrapper.find(`li[data-test="tab-player1"]`)).toHaveLength(1);
    expect(wrapper.find(`li[data-test="tab-player2"]`)).toHaveLength(1);
    expect(wrapper.find(`li[data-test="tab-dealer"]`)).toHaveLength(1);
  });

  test("Handles tab switching properly", () => {
    const handleTabClick = jest.fn();
    CustomIP.prototype.handleSubmit = handleTabClick;
    const state = { ...testState };
    const wrapper = buildWrapper(state);

    // DCV by deafult
    expect(wrapper.find(`input[name="dcv"]`)).toHaveLength(1);
    expect(wrapper.find(`input[name="bvv"]`)).toHaveLength(1);
    expect(wrapper.find(`input[name="player1"]`)).toHaveLength(0);
    expect(wrapper.find(`input[name="player2"]`)).toHaveLength(0);

    // Switch to player1
    wrapper.find(`Tab[data-test="tab-player1"]`).simulate("click");
    expect(wrapper.find(`input[name="player1"]`)).toHaveLength(1);
    expect(wrapper.find(`input[name="player2"]`)).toHaveLength(0);
    expect(wrapper.find(`input[name="dcv"]`)).toHaveLength(0);
    expect(wrapper.find(`input[name="bvv"]`)).toHaveLength(0);

    // Switch to player2
    wrapper.find(`li[data-test="tab-player2"]`).simulate("click");
    expect(wrapper.find(`input[name="player2"]`)).toHaveLength(1);
    expect(wrapper.find(`input[name="player1"]`)).toHaveLength(0);
    expect(wrapper.find(`input[name="dcv"]`)).toHaveLength(0);
    expect(wrapper.find(`input[name="bvv"]`)).toHaveLength(0);
  });

  test("Proceeds correctly with the dealer node", () => {
    const state = { ...testState };
    const wrapper = buildWrapper(state);

    // Simulate the user inputting IP addresses
    wrapper.find(`input[name="dcv"]`).simulate("change", {
      target: { value: "1.2.3.4" }
    });
    wrapper.find(`input[name="bvv"]`).simulate("change", {
      target: { value: "5.6.7.8" }
    });

    // Click the Set Nodes button
    wrapper.find(`Button[data-test="set-nodes-button"]`).simulate("click");

    // Sets the nodes in state
    expect(updateStateValue).toHaveBeenCalledWith(
      "nodes",
      { bvv: "5.6.7.8", dcv: "1.2.3.4" },
      dispatch
    );

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

    // Closes the startup modal
    expect(closeStartupModal).toHaveBeenCalledWith(dispatch);
  });

  test("Proceeds correctly with a player node", () => {
    const state = { ...testState };
    const wrapper = buildWrapper(state);

    // Switch to player2 tab
    wrapper.find(`li[data-test="tab-player2"]`).simulate("click");

    // Simulate the user inputting IP addresses
    wrapper.find(`input[name="player2"]`).simulate("change", {
      target: { value: "9.9.9.9" }
    });

    // Click the Set Nodes button
    wrapper.find(`Button[data-test="set-nodes-button"]`).simulate("click");

    // Sets the nodes in state
    expect(updateStateValue).toHaveBeenCalledWith(
      "nodes",
      { player2: "9.9.9.9" },
      dispatch
    );

    // Sets the nodeType in state
    expect(updateStateValue).toHaveBeenCalledWith(
      "nodeType",
      "player",
      dispatch
    );

    // Sets the userSeat in state
    expect(setUserSeat).toHaveBeenCalledWith("player2", dispatch);

    // Starts the game
    expect(game).toHaveBeenCalledWith(
      { gametype: "", pot: [0] },
      state,
      dispatch
    );

    // Connects the opponent (temporary)
    expect(connectPlayer).toHaveBeenCalledWith("player1", dispatch);

    // Closes the startup modal
    expect(closeStartupModal).toHaveBeenCalledWith(dispatch);
  });
});
