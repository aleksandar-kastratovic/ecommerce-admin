import React from "react";

import { shallow } from "enzyme";

import ListTableHead from "./ListTableHead";

describe("<ListTableHead />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<ListTableHead />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
