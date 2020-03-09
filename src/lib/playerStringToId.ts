const palyerStringToId = (playerString: string): number =>
  Number(playerString.slice(-1)) - 1;

export default palyerStringToId;
