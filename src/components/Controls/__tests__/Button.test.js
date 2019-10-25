import React from "react";
import { shallow } from "enzyme";
import Button from "../Button";

describe("Button", () => {
  test("displays the label", () => {
    const button = shallow(<Button label="Start" />);

    expect(
      button
        .find("ButtonInnerWrapper")
        .childAt(0)
        .text()
    ).toBe("Start");
  });
});
