// Validates whether the deposit address is a valid CHIPS address

const isValidAddress = (address: string): boolean => {
  const reg = /^[a-km-zA-HJ-NP-Z1-9]{26,35}$/;
  return reg.test(address);
};

export default isValidAddress;
