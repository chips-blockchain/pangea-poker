import { Howl, Howler } from "howler";
import alert from "./samples/alert.mp3";
import call from "./samples/call.mp3";
import check from "./samples/check.mp3";
import collectChips from "./samples/collectChips.mp3";
import dealCard from "./samples/dealCard.mp3";
import fold from "./samples/fold.mp3";
import raise from "./samples/raise.mp3";
import winnerSelect from "./samples/winnerSelect.mp3";

const sounds = {
  alert: new Howl({
    src: alert
  }),
  call: new Howl({
    src: call
  }),
  check: new Howl({
    src: check
  }),
  collectChips: new Howl({
    src: collectChips
  }),
  dealCard: new Howl({
    src: dealCard
  }),
  fold: new Howl({
    src: fold
  }),
  raise: new Howl({
    src: raise
  }),
  winnerSelect: new Howl({
    src: winnerSelect
  })
};

export default sounds;
