import React from "react";

const Stack = props => {
  const countChips = num => {
    // Convert the total chip number to an array
    const numArray = Array.from(num.toString());
    // Reverse the array
    numArray.reverse();

    // Clalculate how many ones and fives (tens and fifites, hundreds and five-hundreds, etc) per decimal point
    let chipsArray = numArray.map(num => {
      let ones = num % 5;
      let fives = (num - ones) / 5;
      return [ones, fives];
    });

    // Put the results into an object
    // let chipsObject = {};
    // Object.assign(chipsObject, chipsArray);
    console.log(chipsArray);
    return chipsArray;
  };

  let chipsCount = countChips(props.chips);

  return (
    <div>
      {chipsCount.map(decimal => {
        console.log(decimal);
        [...Array(decimal[0])].map((e, i) => console.log("ones"));
        [...Array(decimal[1])].map((e, i) => console.log("fives"));
      })}
    </div>
  );
};

export default Stack;
