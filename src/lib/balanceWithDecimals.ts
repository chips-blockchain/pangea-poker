// Displays the balance with 8 decimals

const displayBalanceDecimals = (balance: number | string): string => {
  return (Math.round(Number(balance) * 100000000) / 100000000).toFixed(8);
};

export default displayBalanceDecimals;
