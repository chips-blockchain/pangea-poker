import { mount } from "enzyme";
import { StateContext, DispatchContext } from "../../../store/context";
import MainPot from "../MainPot";
import testState from "../../../store/testState";
import { GameTurns } from "../../../lib/constants";

const dispatch = jest.fn();

const buildWrapper = (dispatch, state) => {
  return mount(
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <MainPot
          pot={state.pot}
          gameTurn={state.gameTurn}
          winners={state.winners}
        />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

describe("MainPot", () => {
  test("displays the main pot with the correct amount", () => {
    const state = { ...testState, winners: [undefined], pot: [1268] };
    const wrapper = buildWrapper(dispatch, state);

    expect(wrapper.find(`div[data-test="main-pot"]`)).toHaveLength(1);
    expect(wrapper.find(`div[data-test="main-pot-player1"]`)).toHaveLength(0);
    expect(wrapper.find(`div[data-test="main-pot-player2"]`)).toHaveLength(0);
    expect(
      wrapper.find(`div[data-test="main-pot"] span[data-test="bet"]`).text()
    ).toContain("1,268");
  });

  test("displays two pots for two players", () => {
    const state = {
      ...testState,
      winners: ["player1", "player2"],
      pot: [200],
      gameTurn: GameTurns.showDownj
    };
    const wrapper = buildWrapper(dispatch, state);

    expect(wrapper.find(`div[data-test="main-pot"]`)).toHaveLength(0);
    expect(wrapper.find(`div[data-test="main-pot-player1"]`)).toHaveLength(1);
    expect(wrapper.find(`div[data-test="main-pot-player2"]`)).toHaveLength(1);
    expect(
      wrapper
        .find(`div[data-test="main-pot-player1"] span[data-test="bet"]`)
        .text()
    ).toContain("200");
  });

  // TODO: Add tests for the pots location
});
