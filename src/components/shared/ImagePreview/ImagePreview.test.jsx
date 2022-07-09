import React from "react";

import { shallow } from "enzyme";

import ImagePreview from "./ImagePreview";

describe("<ImagePreview />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<ImagePreview />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
