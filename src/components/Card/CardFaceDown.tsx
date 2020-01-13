import { css } from "@emotion/core";
import cardBg from "./cards/bg-red.svg";

interface IProps {
  centered: boolean;
  second?: boolean;
  seat: string;
  seats: number;
}

const CardFaceDown: React.FunctionComponent<IProps> = ({
  centered,
  second,
  seat,
  seats
}) => {
  // Calculate the offset in seconds between the first and second card for the animation and sound
  const modifier = second ? seats : 0;
  const cardOffset = (Number(seat.slice(-1)) + modifier - 1) * 0.1;

  return (
    <img
      src={cardBg}
      css={css`
        ${
          second && centered
            ? "position: relative; left: -3rem;"
            : second
            ? "position: relative; left: -2.25rem;"
            : null
        }
          /* Centering the cards in a not so elegant way */
        ${
          centered && seat == "player1"
            ? "transform: translate(-7.3rem, 11rem);"
            : centered && seat == "player2"
            ? "transform: translate(-17.4rem, 4.3rem);"
            : centered && seat == "player3"
            ? "transform: translate(-17.4rem, -2.3rem);"
            : centered && seat == "player4"
            ? "transform: translate(-11.9rem, -8.9rem);"
            : centered && seat == "player5"
            ? "transform: translate(0.9rem, -8.9rem);"
            : centered && seat == "player6"
            ? "transform: translate(13.5rem, -8.9rem);"
            : centered && seat == "player7"
            ? "transform: translate(19rem, -2.3rem);"
            : centered && seat == "player8"
            ? "transform: translate(19rem, 4.3rem);"
            : centered && seat == "player9"
            ? "transform: translate(9rem, 11rem);"
            : ""
        }
        ${centered && "opacity: 0;"}
        /* Card deal animation speed */
        transition: transform 0.3s ease, opacity 0.1s;
        /* Delay for the cards */
        transition-delay: ${cardOffset}s;
      `}
    />
  );
};

export default CardFaceDown;
