import { css } from "@emotion/core";
import Chip from "./Chip";

// This component renders a stack of chips on each other that is used inside the Bet component

interface IProps {
  chips: number;
}

const Stack: React.FunctionComponent<IProps> = ({ chips }) => {
  // This component calculates how many of each chips should be rendered based on the bet amount, and renders one or more stacks as a result

  const countChips = (num: number): number[][] => {
    // Convert the total chip number to an array
    const numArray: string[] = Array.from(num.toString());
    // Reverse the array, so the numbers reperesent increasing decimal points
    numArray.reverse();

    // Clalculate how many 1s and 5s (10s and 50s, 100s and 500s, etc) per decimal point we have
    const chipsArray: number[][] = numArray.map((num: string) => {
      const ones: number = Number(num) % 5;
      const fives: number = (Number(num) - ones) / 5;
      return [ones, fives];
    });
    return chipsArray;
  };

  // Merge the nested arrays, so we only have a single array of numbers
  const chipsCountArray: number[][] = countChips(chips);
  // Merge the nested arrays, so we only have a single array of numbers
  const mergedArray: number[] = [].concat(...chipsCountArray);

  // Add 0s for the non-existent chips so the so the array.length is 24 (because we have
  // a total of 24 types of chips) and we can rename the keys later
  for (let i = 0; i < 24; i++) {
    !mergedArray[i] && mergedArray.push(0);
  }

  interface IChipsCountObject {
    [key: number]: number;
  }
  // Convert the array into an Object before renaming
  const chipsCountObject: IChipsCountObject = Object.assign({}, mergedArray);

  interface IKeysMap {
    [key: number]: string;
  }

  interface IRenamedKeys {
    [key: string]: string;
  }
  // Define a function to rename the keys in the object
  const renameKeys = (
    keysMap: IKeysMap,
    obj: IChipsCountObject
  ): IRenamedKeys =>
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] }
      }),
      {}
    );

  // Rename the keys, so they can be passed down for the Chip component
  const chipsCountWithNames: IRenamedKeys = renameKeys(
    {
      0: "1",
      1: "5",
      2: "10",
      3: "50",
      4: "100",
      5: "500",
      6: "1K",
      7: "5K",
      8: "10K",
      9: "50K",
      10: "100K",
      11: "500K",
      12: "1M",
      13: "5M",
      14: "10M",
      15: "50M",
      16: "100M",
      17: "500M",
      18: "1B",
      19: "5B",
      20: "10B",
      21: "50B",
      22: "100B",
      23: "500B"
    },
    chipsCountObject
  );

  // Define the function that reverses the z-index rules for the chips, so the stack grows from the bottom to the top
  const reverseZIndex = (): string => {
    let zIndexRules: string;
    for (let i = 0; i < 15; i++) {
      zIndexRules += " div:nth-of-type(" + i + ") {z-index:" + (15 - i) + "}";
    }
    return zIndexRules;
  };

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: repeat(16, 0.125rem);
        ${reverseZIndex()}
      `}
    >
      {/* Render chips from the object ("value" times each "key" type of chips) */}
      {Object.keys(chipsCountWithNames).map(key => {
        return [
          ...Array(chipsCountWithNames[key])
        ].map((e: string, i: number) => <Chip chip={key} key={i} />);
      })}
    </div>
  );
};

export default Stack;
