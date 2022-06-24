import React from "react";

import { shallow } from "enzyme";

import DetailsList from "./DetailsList";

describe("<DetailsList />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<DetailsList />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
