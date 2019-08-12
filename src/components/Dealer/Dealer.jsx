import { css } from "@emotion/core";
import DealerButton from "./dealer.svg";

const Dealer = props => {
  return (
    <img
      src={DealerButton}
      css={css`
        position: absolute;
        ${props.dealer === "player1" && "top: 10rem; right: 18rem;"}
        ${props.dealer === "player2" && "top: 12.5rem; right: 11.5rem;"}
        ${props.dealer === "player3" && "bottom: 15rem; right: 11.5rem;"}
        ${props.dealer === "player4" && "bottom: 11.5rem; right: 15.5rem;"};
        ${props.dealer === "player5" && "bottom: 11.5rem; right: 20rem;"};
        ${props.dealer === "player6" && "bottom: 11.5rem; left: 15.5rem"};
        ${props.dealer === "player7" && "bottom: 15rem; left: 11.5rem;"};
        ${props.dealer === "player8" && "top: 12.5rem; left: 11.5rem;"};
        ${props.dealer === "player9" && "top: 10rem; left: 15rem;"};
        transition: all 0.5s ease-out;
      `}
    />
  );
};

export default Dealer;
