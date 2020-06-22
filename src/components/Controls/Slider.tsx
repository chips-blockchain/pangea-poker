import { useContext, useEffect } from "react";
import { StateContext } from "../../store/context";
import RCSlider from "rc-slider";
import "./css/slider.css";
import { IState } from "../../store/initialState";
import { SliderContainer, SliderWrapper } from "./css/style";

// This is the Slider component used in Controls to set bet/raise amount

interface IProps {
  setRaiseAmount: (arg: number) => void;
}

const Slider: React.FunctionComponent<IProps> = ({ setRaiseAmount }) => {
  const state: IState = useContext(StateContext);
  const { minRaiseTo, players, toCall, userSeat } = state;

  const chips = players[userSeat].chips;
  const betAmount = players[userSeat].betAmount;
  const totalStack = chips + betAmount;
  const step = minRaiseTo - toCall;

  // Have to round up total stack to a value that is a step increment of the slider so the All-in can be rounded down accordingly
  const roundedMax = totalStack - (totalStack % step) + toCall;

  // Reset the raise amount on the slider when the minimum raise changes
  useEffect(() => {
    setRaiseAmount(minRaiseTo);
  }, [minRaiseTo]);

  // Round the top step of the slider down to the total stack of the player
  const handleSliderAmount = () => (sliderStep: number): void => {
    if (sliderStep > totalStack) setRaiseAmount(totalStack);
    else setRaiseAmount(sliderStep);
  };

  return (
    <SliderContainer>
      <SliderWrapper>
        <RCSlider
          onChange={handleSliderAmount()}
          min={minRaiseTo}
          step={step}
          max={roundedMax}
        />
      </SliderWrapper>
    </SliderContainer>
  );
};

export default Slider;
