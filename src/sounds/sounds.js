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
    src: alert,
    format: ["mp3"]
  }),
  call: new Howl({
    src: call,
    format: ["mp3"]
  }),
  check: new Howl({
    src: check,
    format: ["mp3"]
  }),
  collectChips: new Howl({
    src: collectChips,
    format: ["mp3"]
  }),
  dealCard: new Howl({
    src: dealCard,
    format: ["mp3"]
  }),
  fold: new Howl({
    src: fold,
    format: ["mp3"]
  }),
  raise: new Howl({
    src: raise,
    format: ["mp3"]
  }),
  winnerSelect: new Howl({
    src: winnerSelect,
    format: ["mp3"]
  })
};

export default sounds;
