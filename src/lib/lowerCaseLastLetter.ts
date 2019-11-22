const lowerCaseLastLetter = (string: string) =>
  string.slice(0, string.length - 1) +
  string.slice(string.length - 1).toLowerCase();

export default lowerCaseLastLetter;
