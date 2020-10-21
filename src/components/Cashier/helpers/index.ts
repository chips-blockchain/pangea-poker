export const inputIsValid = (val: string): boolean =>
  // Limit input to 8 decimal points maximum
  /^[0-9]|[0-9]+(\.[0-9]{1,8})$/g.test(val);

export const getTotal = (amount: string | number, fee: number): number =>
  Number(amount) - fee;
