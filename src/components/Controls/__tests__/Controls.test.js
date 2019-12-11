import React from "react";
import { mount } from "enzyme";
import Controls from "../Controls";
import { StateContext, DispatchContext } from "../../../store/context";
import testState from "../../../store/testState";
import * as actions from "../../../store/actions";
import { Possibilities, PlayerActions } from "../../../lib/constants";

const dispatch = jest.fn();

const buildWrapper = (dispatch, state) => {
  return mount(
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Controls />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

describe("Controls", () => {
  test("displays all the controls by default", () => {
    const state = { ...testState };
    const wrapper = buildWrapper(dispatch, state);

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
    const state = {
      ...testState,
      toCall: 100,
      controls: { ...testState.controls, canCheck: false }
    };

    const wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper.find(`[data-test="table-controls-call-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-call-button"]`).text()
    ).toBe("Call 100");
  });

  test("shows the Raise button with the amount when Raise is not All-In", () => {
    const state = {
      ...testState,
      minRaiseTo: 100,
      controls: { ...testState.controls, canRaise: true }
    };
    const wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`).text()
    ).toBe("Raise to 100");
  });

  test("shows the Check button instead of the Call button", () => {
    const state = {
      ...testState,
      toCall: 100,
      controls: { ...testState.controls, canCheck: true }
    };
    const wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper.find(`[data-test="table-controls-check-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-check-button"]`).text()
    ).toBe("Check ");
  });

  test("hides the Raise/All-In button", () => {
    const state = {
      ...testState,
      controls: { ...testState.controls, canRaise: false }
    };
    const wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`)
    ).toHaveLength(0);
  });

  test("shows All-In button instead of Raise button when raise would be an all in", () => {
    // The player's stack is 200
    const state = {
      ...testState,
      // Minimum raise is more than the player's stack
      minRaiseTo: 300,
      controls: { ...testState.controls, canRaise: true }
    };
    let wrapper = buildWrapper(dispatch, state);

    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`)
    ).toHaveLength(1);
    expect(
      wrapper.find(`[data-test="table-controls-raise-button"]`).text()
    ).toBe("All-In 200");

    // Minimum raise is equals the player's stack
    state.minRaiseTo = 200;
    wrapper = buildWrapper(dispatch, state);

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
  jest.spyOn(actions, "setLastAction");

  const { bet, fold, sendMessage, setLastAction, showControls } = actions;

  test("handles Fold button when clicked", () => {
    const state = {
      ...testState,
      controls: { ...testState.controls, showControls: true },
      userSeat: "player1",
      players: {
        ...testState.players,
        player1: { ...testState.players.player1, betAmount: 0 }
      }
    };

    const wrapper = buildWrapper(dispatch, state);

    wrapper.find(`[data-test="table-controls-fold-button"]`).simulate("click");

    // Sends Fold to the GUI
    expect(fold).toHaveBeenCalled();
    expect(fold).toHaveBeenCalledTimes(1);
    expect(fold).toHaveBeenCalledWith("player1", dispatch);
    expect(setLastAction).toHaveBeenCalled();
    expect(setLastAction).toHaveBeenCalledTimes(1);
    expect(setLastAction).toHaveBeenCalledWith(0, PlayerActions.fold, dispatch);

    // Sends Fold to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ possibilities: [Possibilities.fold] }),
      "player1",
      state,
      dispatch
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, dispatch);
  });

  test("handles Check button when clicked", () => {
    const state = {
      ...testState,
      controls: { ...testState.controls, showControls: true },
      userSeat: "player1",
      players: {
        ...testState.players,
        player1: { ...testState.players.player1, betAmount: 0 }
      }
    };

    const wrapper = buildWrapper(dispatch, state);

    wrapper.find(`[data-test="table-controls-check-button"]`).simulate("click");

    // Send Check to the GUI
    expect(setLastAction).toHaveBeenCalled();
    expect(setLastAction).toHaveBeenCalledTimes(1);
    expect(setLastAction).toHaveBeenCalledWith(0, "CHECK", dispatch);

    // Sends Check to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ possibilities: [Possibilities.check] }),
      "player1",
      state,
      dispatch
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, dispatch);
  });

  test("handles Call button when clicked", () => {
    const state = {
      ...testState,
      controls: { ...testState.controls, showControls: true, canCheck: false },
      userSeat: "player1",
      players: {
        ...testState.players,
        player1: { ...testState.players.player1, betAmount: 0 }
      },
      toCall: 100
    };

    const wrapper = buildWrapper(dispatch, state);

    wrapper.find(`[data-test="table-controls-call-button"]`).simulate("click");

    // Sends Call to the GUI
    expect(bet).toHaveBeenCalled();
    expect(bet).toHaveBeenCalledTimes(1);
    expect(bet).toHaveBeenCalledWith("player1", 100, state, dispatch);
    expect(setLastAction).toHaveBeenCalled();
    expect(setLastAction).toHaveBeenCalledTimes(1);
    expect(setLastAction).toHaveBeenCalledWith(0, PlayerActions.call, dispatch);

    // Sends Call to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        possibilities: [Possibilities.call],
        bet_amount: 100
      }),
      "player1",
      state,
      dispatch
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, dispatch);
  });

  test("handles Raise button when clicked", () => {
    const state = {
      ...testState,
      controls: { ...testState.controls, showControls: true, canCheck: false },
      userSeat: "player1",
      players: {
        ...testState.players,
        player1: { ...testState.players.player1, betAmount: 0 }
      },
      minRaiseTo: 50
    };

    const wrapper = buildWrapper(dispatch, state);

    wrapper.find(`[data-test="table-controls-raise-button"]`).simulate("click");

    // Sends Raise to the GUI
    expect(bet).toHaveBeenCalled();
    expect(bet).toHaveBeenCalledTimes(1);
    expect(bet).toHaveBeenCalledWith("player1", 50, state, dispatch);
    expect(setLastAction).toHaveBeenCalled();
    expect(setLastAction).toHaveBeenCalledTimes(1);
    expect(setLastAction).toHaveBeenCalledWith(
      0,
      PlayerActions.raise,
      dispatch
    );

    // Sends Raise to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        possibilities: [Possibilities.raise],
        bet_amount: 50
      }),
      "player1",
      state,
      dispatch
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, dispatch);
  });

  test("handles All-In button when clicked", () => {
    const state = {
      ...testState,
      controls: { ...testState.controls, showControls: true, canCheck: false },
      userSeat: "player1",
      players: {
        ...testState.players,
        player1: { ...testState.players.player1, betAmount: 0 }
      },
      minRaiseTo: 200
    };

    const wrapper = buildWrapper(dispatch, state);

    wrapper.find(`[data-test="table-controls-raise-button"]`).simulate("click");

    // Sends All-In to the GUI
    expect(bet).toHaveBeenCalled();
    expect(bet).toHaveBeenCalledTimes(1);
    expect(bet).toHaveBeenCalledWith("player1", 200, state, dispatch);
    expect(setLastAction).toHaveBeenCalled();
    expect(setLastAction).toHaveBeenCalledTimes(1);
    expect(setLastAction).toHaveBeenCalledWith(
      0,
      PlayerActions.allIn,
      dispatch
    );

    // Sends All-In to the backend
    expect(sendMessage).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledTimes(1);
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        possibilities: [Possibilities.allIn],
        bet_amount: 200
      }),
      "player1",
      state,
      dispatch
    );

    // Hides the Controls
    expect(showControls).toHaveBeenCalled();
    expect(showControls).toHaveBeenCalledTimes(1);
    expect(showControls).toHaveBeenCalledWith(false, dispatch);
  });
});
