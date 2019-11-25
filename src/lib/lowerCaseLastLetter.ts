const lowerCaseLastLetter = (string: string) => {
  if (string.length === 0) {
    throw new Error("Empty strings don't have last letter.");
  }
  const lastCharacter = string.slice(string.length - 1);
  if (lastCharacter.toUpperCase() != lastCharacter.toLowerCase()) {
    return string.slice(0, string.length - 1) + lastCharacter.toLowerCase();
  } else
    throw new Error(
      `The last character is ${lastCharacter} which is not a letter.`
    );
};

export default lowerCaseLastLetter;
