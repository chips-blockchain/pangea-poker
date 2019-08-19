const numberWithCommas: Function = (number: number): string => {
  if (Number(number) == number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else throw new Error("Can't convert non-numberic amounts.");
};

export default numberWithCommas;
