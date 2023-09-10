import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import LocationInput from "../LocationForm";

describe("Test if the LocationInput component is working as expected", () => {
  it("<LocationInput /> matches snapshot", () => {
    const component = render(
      <LocationInput
        disabled={false}
        onInput={() => {}}
        error="This is an error"
        data-test-id="error-msg"
      />
    );
    expect(component.container).toMatchSnapshot();
  });

  it("<LocationInput /> renders without exploding", () => {
    const component = render(
      <LocationInput
        disabled={false}
        onInput={() => {}}
        error="This is an error"
        data-test-id="error-msg"
      />
    );
    expect(component.getByTestId("error-msg")).toBeInTheDocument();
  });
});
