import * as actions from "../actions";

describe("addToHandHistory", () => {
  const dispatch = jest.fn();

  test("dispatches the hand history with the last action", () => {
    const lastAction = "Player 1 joined the table.";
    const type = "addToHandHistory";

    actions.addToHandHistory(lastAction, dispatch);
    expect(dispatch).toHaveBeenCalledWith({ payload: lastAction, type });
  });
});

describe("processControls", () => {
  const dispatch = jest.fn();

  test("dispatches with both Check and Raise disabled", () => {
    const possibilities = [6, 7];
    const type = "processControls";

    actions.processControls(possibilities, dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      payload: { canCheck: false, canRaise: false },
      type
    });
  });

  test("dispatches with Check enabled", () => {
    const possibilities = [3];
    const type = "processControls";

    actions.processControls(possibilities, dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      payload: { canCheck: true, canRaise: false },
      type
    });
  });

  test("dispatches with Raise enabled", () => {
    const possibilities = [4];
    const type = "processControls";

    actions.processControls(possibilities, dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      payload: { canCheck: false, canRaise: true },
      type
    });
  });
});
