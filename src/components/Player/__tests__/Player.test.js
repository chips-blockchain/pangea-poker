import React from "react";
import { mount } from "enzyme";
import { StateContext, DispatchContext } from "../../../store/context";
import testState from "../../../store/testState";
import * as actions from "../../../store/actions";
import Player from "../Player";

const dispatch = jest.fn();

const buildWrapper = (props, dispatch, state) => {
  return mount(
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Player
          chips={props.chips}
          connected={props.connected}
          hasCards={props.hasCards}
          isActive={props.isActive}
          playerCards={props.playerCards}
          seat={props.seat}
          showCards={props.showCards}
          winner={props.winner}
        />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

// Props
const defaultProps = {
  chips: 200,
  connected: true,
  hasCards: true,
  isActive: true,
  playerCards: ["Ac", "Ad"],
  seat: "player1",
  showCards: false,
  winner: "player1"
};

const { seat } = defaultProps;

// Action Spies
jest.spyOn(actions, "playerJoin");
jest.spyOn(actions, "playerJoin");
const { playerJoin, setSeatMessage } = actions;

describe("Player", () => {
  test("joins when not conencted and clicked", () => {
    const state = {
      ...testState,
      userSeat: "player1"
    };
    const wrapper = buildWrapper(
      { ...defaultProps, connected: false },
      dispatch,
      state
    );

    const playerWidget = wrapper.find(
      `div[data-test="player-widget-${defaultProps.seat}"]`
    );

    expect(playerWidget.exists()).toEqual(true);

    playerWidget.simulate("click");

    expect(playerJoin).toHaveBeenCalled();
    expect(playerJoin).toHaveBeenCalledTimes(1);
    expect(playerJoin).toHaveBeenCalledWith(seat, state, dispatch);
  });

  test("is highlighted when active", () => {
    const state = {
      ...testState,
      userSeat: "player1"
    };
    const wrapper = buildWrapper(defaultProps, dispatch, state);

    expect(wrapper.find(`[data-test="player-highlight"]`).exists()).toEqual(
      true
    );
  });

  test("is dispalying the timer when active", () => {
    const state = {
      ...testState,
      userSeat: "player1"
    };
    const wrapper = buildWrapper(defaultProps, dispatch, state);

    expect(wrapper.find(`[data-test="player-timer-bar"]`).exists()).toEqual(
      true
    );
  });
});
