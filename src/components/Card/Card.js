import React from "react";
import "./svg-sprite.css";

const Card = props => {
  return <div className={`icon card-${props.card} card-${props.card}-dims`} />;
};

export default Card;
