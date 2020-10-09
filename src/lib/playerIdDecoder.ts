export const getStringId = (id: number): string =>
  "player".concat(id.toString());

export const validID = (min: number, max: number, id: number) =>
  typeof id === "number" && id <= max && id >= min && id % 1 === 0;

export const validBEid = (id: number): boolean => validID(0, 8, id);

export const validGUIid = (id: number): boolean => validID(1, 9, id);

/**
 * Frontend counts its player ids from 1
 * @param id
 */
export const getGUIid = (id: number): number => {
  if (validBEid(id)) {
    return id + 1;
  } else
    throw new Error(
      `The GUI Player ID must be a number between 0 and 8 with no decimals. Instead it is ${id}.`
    );
};

/**
 * Backend counts its player ids from 0
 * @param id - frontend ID
 */
export const getBEid = (id: number): number => {
  if (validGUIid(id)) {
    return id - 1;
  } else
    throw new Error(
      `The GUI Player ID must be a number between 1 and 9 with no decimals. Instead it is ${id}.`
    );
};
