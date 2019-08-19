import playerIdToString from "../playerIdToString";

describe("Converts a numberical player ID to a player string (eg. player1)", () => {
  test("ID a valid input", () => {
    expect(() => {
      playerIdToString("player1");
    }).toThrow(
      `The Player ID must be a number between 0 and 10 with no decimals. Instead it is player1.`
    );
    expect(() => {
      playerIdToString([0]);
    }).toThrow(
      `The Player ID must be a number between 0 and 10 with no decimals. Instead it is 0.`
    );
    expect(() => {
      playerIdToString("0");
    }).toThrow(
      "The Player ID must be a number between 0 and 10 with no decimals. Instead it is 0."
    );
    expect(() => {
      playerIdToString(undefined);
    }).toThrow(
      "The Player ID must be a number between 0 and 10 with no decimals. Instead it is undefined."
    );
    expect(() => {
      playerIdToString(-1);
    }).toThrow(
      "The Player ID must be a number between 0 and 10 with no decimals. Instead it is -1."
    );
    expect(() => {
      playerIdToString(100);
    }).toThrow(
      "The Player ID must be a number between 0 and 10 with no decimals. Instead it is 100."
    );
    expect(() => {
      playerIdToString(1.5);
    }).toThrow(
      "The Player ID must be a number between 0 and 10 with no decimals. Instead it is 1.5."
    );
  });
  test("Returns the proper string ID", () => {
    expect(playerIdToString(1)).toBe("player2");
  });
});
