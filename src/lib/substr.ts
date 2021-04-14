const CHAR_COUNT = 30;

const substr = (str: string | string, length: number = CHAR_COUNT): string => {
  return String(str).substr(0, length) + "...";
};

export default substr;
