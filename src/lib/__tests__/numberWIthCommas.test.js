import numberWithCommas from "../numberWithCommas";

describe("Formats number to conntain a comma at each thousand", () => {
  test("Adds commas to numbers", () => {
    expect(numberWithCommas(1000000)).toBe("1,000,000");
    expect(numberWithCommas("1000000")).toBe("1,000,000");
    expect(numberWithCommas("1000000.00")).toBe("1,000,000.00");
  });
  test("Throws an error is the input is non-number", () => {
    expect(() => {
      numberWithCommas("asdf");
    }).toThrow("Can't convert non-numberic amounts.");
    expect(() => {
      numberWithCommas(undefined);
    }).toThrow("Can't convert non-numberic amounts.");
    expect(() => {
      numberWithCommas(numberWithCommas());
    }).toThrow("Can't convert non-numberic amounts.");
  });
});
