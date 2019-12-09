import React from "react";
import { mount } from "enzyme";
import Controls from "../Controls";
import { StateContext, DispatchContext } from "../../../store/context";
import testState from "../../../store/testState";
import * as actions from "../../../store/actions";
import { Possibilities } from "../../../lib/constants";

const buildWrapper = stateToTest => {
  const dispatch = jest.fn();
  return mount(
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={stateToTest}>
        <Controls />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

describe("Controls", () => {
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
      wrapper.find(`[data-test="table-controls-check-button"]`)
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
      wrapper.find(`[data-test="table-controls-call-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-call-button"]`).text()
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
      wrapper.find(`[data-test="table-controls-check-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-check-button"]`).text()
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

describe("Button clicks", () => {
  jest.spyOn(actions, "fold");
  jest.spyOn(actions, "sendMessage");
  jest.spyOn(actions, "showControls");
  jest.spyOn(actions, "bet");

  const { bet, fold, sendMessage, showControls } = actions;

  test("handles Fold button when clicked", () => {
    const state = testState;
    state.controls.showControls = true;
    state.userSeat = "player1";
    state.players.player1.betAmount = 0;

    const wrapper = buildWrapper(state);

    wrapper.find(`[data-test="table-controls-fold-button"]`).simulate("click");

    // Sends fold to the GUI
    expect(fold).toHaveBeenCalled();
    expect(fold).toHaveBeenCalledTimes(1);
    expect(fold).toHaveBeenCalledWith("player1", expect.anything());

    // Sends fold to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ possibilities: [Possibilities.fold] }),
      "player1",
      state,
      expect.anything()
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, expect.anything());
  });

  test("handles Check button when clicked", () => {
    const state = testState;
    state.controls.showControls = true;
    state.userSeat = "player1";
    state.players.player1.betAmount = 0;

    const wrapper = buildWrapper(state);

    wrapper.find(`[data-test="table-controls-check-button"]`).simulate("click");

    // Sends fold to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ possibilities: [Possibilities.check] }),
      "player1",
      state,
      expect.anything()
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, expect.anything());
  });

  test("handles Call button when clicked", () => {
    const state = testState;
    state.controls.showControls = true;
    state.userSeat = "player1";
    state.controls.canCheck = false;
    state.toCall = 100;
    state.players.player1.betAmount = 0;

    const wrapper = buildWrapper(state);

    wrapper.find(`[data-test="table-controls-call-button"]`).simulate("click");

    // Sends fold to the GUI
    expect(bet).toHaveBeenCalled();
    expect(bet).toHaveBeenCalledTimes(1);
    expect(bet).toHaveBeenCalledWith("player1", 100, state, expect.anything());

    // Sends call to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        possibilities: [Possibilities.call],
        bet_amount: 100
      }),
      "player1",
      state,
      expect.anything()
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, expect.anything());
  });

  test("handles Raise button when clicked", () => {
    const state = testState;
    state.controls.showControls = true;
    state.userSeat = "player1";
    state.minRaiseTo = 50;
    state.controls.canCheck = false;
    state.players.player1.betAmount = 0;

    const wrapper = buildWrapper(state);

    wrapper.find(`[data-test="table-controls-raise-button"]`).simulate("click");

    // Sends fold to the GUI
    expect(bet).toHaveBeenCalled();
    expect(bet).toHaveBeenCalledTimes(1);
    expect(bet).toHaveBeenCalledWith("player1", 50, state, expect.anything());

    // Sends call to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        possibilities: [Possibilities.raise],
        bet_amount: 50
      }),
      "player1",
      state,
      expect.anything()
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, expect.anything());
  });

  test("handles AllIn button when clicked", () => {
    const state = testState;
    state.controls.showControls = true;
    state.userSeat = "player1";
    state.minRaiseTo = 200;
    state.players.player1.chips = 200;
    state.controls.canCheck = false;
    state.players.player1.betAmount = 0;

    const wrapper = buildWrapper(state);

    wrapper.find(`[data-test="table-controls-raise-button"]`).simulate("click");

    // Sends fold to the GUI
    expect(bet).toHaveBeenCalled();
    expect(bet).toHaveBeenCalledTimes(1);
    expect(bet).toHaveBeenCalledWith("player1", 200, state, expect.anything());

    // Sends call to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        possibilities: [Possibilities.allIn],
        bet_amount: 200
      }),
      "player1",
      state,
      expect.anything()
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, expect.anything());
  });
});
