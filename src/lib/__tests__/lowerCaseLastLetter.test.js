import lowerCaseLastLetter from "../lowerCaseLastLetter";

describe("LowerCases the last letter of a string", () => {
  test("Return the proper string", () => {
    expect(lowerCaseLastLetter("AD")).toBe("Ad");
    expect(lowerCaseLastLetter("A")).toBe("a");
    expect(lowerCaseLastLetter("10S")).toBe("10s");
  });
});
