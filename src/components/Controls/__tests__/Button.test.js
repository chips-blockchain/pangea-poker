import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Button from "../Button";

test("<Button />", () => {
  const { getByTestId } = render(<Button label="Call" amount="10000" />);
  const button = getByTestId("button");
  expect(button.tagName).toBe("BUTTON");
  expect(button.textContent).toBe("Call 10,000");
});
