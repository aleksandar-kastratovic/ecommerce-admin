import React from "react";

import { shallow } from "enzyme";

import B2Bsettings from "./B2Bsettings";

describe("<B2Bsettings />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<B2Bsettings />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
