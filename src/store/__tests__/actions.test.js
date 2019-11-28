import * as actions from "../actions";

describe("actions", () => {
  const dispatch = jest.fn();

  test("dispatches the hand history with the last action", () => {
    const lastAction = "Player 1 joined the table.";
    const type = "addToHandHistory";

    actions.addToHandHistory(lastAction, dispatch);
    expect(dispatch).toHaveBeenCalledWith({ payload: lastAction, type });
  });
});
