const playerIdToString = (id: number): string => {
  if (typeof id == "number" && id < 10 && id >= 0 && id % 1 === 0) {
    return `player${id + 1}`;
  } else
    throw new Error(
      `The Player ID must be a number between 0 and 10 with no decimals. Instead it is ${id}.`
    );
};

export default playerIdToString;
