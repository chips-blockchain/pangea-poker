const isStringOrNumber = (element): boolean =>
  typeof element === "string" || typeof element === "number";

const arrayToSentence = (array: string[] | number[]): string => {
  if (array.length > 0) {
    if (array.every(isStringOrNumber))
      return array
        .toString()
        .replace(/,/g, ", ")
        .replace(/, (?!.*,)/g, " and ");
    else
      console.error(
        "Can only convert an array containing string or number elements"
      );
  } else console.error("Can't convert empty array to a sentence.");
};

export default arrayToSentence;
