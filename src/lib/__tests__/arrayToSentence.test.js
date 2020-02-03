import arrayToSentence from "../arrayToSentence";

console.error = jest.fn();

describe("Turns an array into a sentence string", () => {
  test("Returns the correct string with two string elements", () => {
    const array = ["Ad", "Kc"];
    expect(arrayToSentence(array)).toBe("Ad and Kc");
  });
  test("Returns the correct string with three string elements", () => {
    const array = ["Ad", "Kc", "5d"];
    expect(arrayToSentence(array)).toBe("Ad, Kc and 5d");
  });
  test("Returns the correct string with both mixed and string elements", () => {
    const array = ["Ad", 4, "5d", "Qd"];
    expect(arrayToSentence(array)).toBe("Ad, 4, 5d and Qd");
  });
  test("Returns the correct string with number elements", () => {
    const array = [5, 6, 7];
    expect(arrayToSentence(array)).toBe("5, 6 and 7");
  });
  test("Returns the correct string with one element", () => {
    const array = ["Ad"];
    expect(arrayToSentence(array)).toBe("Ad");
  });
  test("Logs an error to the console when the array is empty", () => {
    const array = [];
    arrayToSentence(array);
    expect(console.error).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "Can't convert empty array to a sentence."
    );
  });
  test("Logs an error to the console when the array has undefined in it", () => {
    const array = [undefined, "4"];
    console.log(arrayToSentence(array));
    expect(console.error).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "Can only convert an array containing string or number elements"
    );
  });
  test("Logs an error to the console when the array has null in it", () => {
    const array = [null, "4"];
    console.log(arrayToSentence(array));
    expect(console.error).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "Can only convert an array containing string or number elements"
    );
  });
  test("Logs an error to the console when the array has boolean in it", () => {
    const array = [true, "4"];
    console.log(arrayToSentence(array));
    expect(console.error).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "Can only convert an array containing string or number elements"
    );
  });
});
