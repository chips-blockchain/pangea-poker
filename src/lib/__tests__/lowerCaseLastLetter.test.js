import lowerCaseLastLetter from "../lowerCaseLastLetter";

describe("LowerCases the last letter of a string", () => {
  test("Return the proper string", () => {
    expect(lowerCaseLastLetter("AD")).toBe("Ad");
    expect(lowerCaseLastLetter("A")).toBe("a");
    expect(lowerCaseLastLetter("10S")).toBe("10s");
  });

  test("Throws error if last letter is not a letter", () => {
    expect(() => lowerCaseLastLetter("A9")).toThrow(
      "The last character is 9 which is not a letter."
    );
    expect(() => lowerCaseLastLetter("A,")).toThrow(
      "The last character is , which is not a letter."
    );
    expect(() => lowerCaseLastLetter("")).toThrow(
      "Empty strings don't have last letter."
    );
  });
});
