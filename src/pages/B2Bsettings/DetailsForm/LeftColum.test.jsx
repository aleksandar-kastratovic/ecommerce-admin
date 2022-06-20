import React from "react";

import { shallow } from "enzyme";

import LeftColum from "./LeftColum";

describe("<LeftColum />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<LeftColum />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
