import React from "react";
import { render } from '@testing-library/react';
import App from "../App";

describe("App component", () => {
  it("matches the snapshot", () => {
    const { getByText } = render(<App />);
    // eslint-disable-next-line
    expect(getByText("hello world")).toBeDefined();
  });
});
