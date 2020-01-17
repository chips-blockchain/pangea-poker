import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

beforeEach(() => {
  window.HTMLMediaElement.prototype.play = () => {
    /* do nothing */
  };
  window.HTMLMediaElement.prototype.load = () => {
    /* do nothing */
  };
});
