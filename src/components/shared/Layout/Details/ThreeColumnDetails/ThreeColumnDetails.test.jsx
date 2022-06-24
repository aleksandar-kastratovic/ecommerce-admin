import React from "react";

import { shallow } from "enzyme";

import ThreeColumnDetails from "./ThreeColumnDetails";

describe("<ThreeColumnDetails />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<ThreeColumnDetails />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
