import React from "react";

import { shallow } from "enzyme";

import TwoColumn from "./TwoColumn";

describe("<TwoColumn />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<TwoColumn />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
