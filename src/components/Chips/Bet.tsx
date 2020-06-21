import numberWithCommas from "../../lib/numberWithCommas";
import Stack from "./Stack";
import {BetWrapper, StackWrapper, AmountWrapper} from "./css/style";

// This component shows a stack of chips and the corresponding amount next to it. Used to show player bets and the main pot.

interface IProps {
  betAmount: number;
  chipsCollected?: boolean;
  forPlayer?: string;
  playerBet?: boolean;
}

const Bet: React.FunctionComponent<IProps> = ({
  betAmount,
  chipsCollected,
  forPlayer,
  playerBet
}) => {
  return (
    <BetWrapper
      forPlayer={forPlayer}
      playerBet={playerBet}
      chipsCollected={chipsCollected}
      data-test={"bet"}
    >
      <StackWrapper forPlayer={forPlayer}>
        <Stack chips={betAmount} />
      </StackWrapper>
      {/* Bet amount in numbers */}
      <AmountWrapper
        forPlayer={forPlayer}
        playerBet={playerBet}
        chipsCollected={chipsCollected}
      >
        {numberWithCommas(betAmount)}
      </AmountWrapper>
    </BetWrapper>
  );
};

export default Bet;
