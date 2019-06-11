import React from "react";
import "./chips-svg-sprite.css";

const Chip = props => {
  return <div className={`icon chip-${props.chip} chip-${props.chip}-dims`} />;
};

export default Chip;
