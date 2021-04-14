const DECIMALS = 8;
const COEF = Math.pow(10, DECIMALS);

const displayBalanceDecimals = (balance: number | string): string => {
  return (Math.round(Number(balance) * COEF) / COEF).toFixed(DECIMALS);
};

export default displayBalanceDecimals;
