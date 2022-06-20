import React from "react";

import { shallow } from "enzyme";

import TabsLayout from "./TabsLayout";

describe("<TabsLayout />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<TabsLayout />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
