import React from "react";

import { shallow } from "enzyme";

import ListTable from "./ListTable";

describe("<ListTable />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<ListTable />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
