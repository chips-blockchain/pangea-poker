import { css } from "@emotion/core";
import DealerButton from "./dealer.svg";

// This component is responsible for displaying the Dealer button

interface IProps {
  dealer:
    | "player1"
    | "player2"
    | "player3"
    | "player4"
    | "player5"
    | "player6"
    | "player7"
    | "player8"
    | "player9";
}

const Dealer: React.FunctionComponent<IProps> = ({ dealer }) => {
  return (
    <img
      src={DealerButton}
      css={css`
        position: absolute;
        ${dealer === "player1" && "top: 10rem; right: 18rem;"}
        ${dealer === "player2" && "top: 12.5rem; right: 11.5rem;"}
        ${dealer === "player3" && "bottom: 15rem; right: 11.5rem;"}
        ${dealer === "player4" && "bottom: 11.5rem; right: 15.5rem;"};
        ${dealer === "player5" && "bottom: 11.5rem; right: 20rem;"};
        ${dealer === "player6" && "bottom: 11.5rem; left: 15.5rem"};
        ${dealer === "player7" && "bottom: 15rem; left: 11.5rem;"};
        ${dealer === "player8" && "top: 12.5rem; left: 11.5rem;"};
        ${dealer === "player9" && "top: 10rem; left: 15rem;"};
        transition: all 0.5s ease-out;
      `}
    />
  );
};

export default Dealer;
