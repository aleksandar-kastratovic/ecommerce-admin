import React from "react";

import { shallow } from "enzyme";

import TextBox from "./TextBox";

describe("<TextBox />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<TextBox />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
