import isValidAddress from "../isValidAddress";

describe("Validates CHIPS addresses", () => {
  test("Only 26 to 35 charachter long addresses are valid", () => {
    expect(isValidAddress("123456789a123456789a123456")).toBe(true);
    expect(isValidAddress("123456789a123456789a123456789")).toBe(true);
    expect(isValidAddress("123456789a123456789a123456789a12345")).toBe(true);
    expect(isValidAddress("123456789a123456789a123456789a123456")).toBe(false);
    expect(isValidAddress("123456789a123456789a123456789a123456789a")).toBe(
      false
    );
  });
  test("Only alphanumberic numbers accepted, except 'I' 'l' 'O' and '0'", () => {
    expect(isValidAddress("123456789a123456789a123456")).toBe(true);
    expect(isValidAddress("123456789a123456789a12345O")).toBe(false);
    expect(isValidAddress("123456789a123456789a12345I")).toBe(false);
    expect(isValidAddress("123456789a123456789a123450")).toBe(false);
    expect(isValidAddress("123456789a123456789a12345l")).toBe(false);
    expect(isValidAddress("123456789a123456789a12345*")).toBe(false);
    expect(isValidAddress("123456789a123456789a12345 ")).toBe(false);
  });
});
