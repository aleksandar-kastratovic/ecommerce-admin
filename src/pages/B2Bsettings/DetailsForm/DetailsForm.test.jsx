import React from "react";

import { shallow } from "enzyme";

import DetailsForm from "./DetailsForm";

describe("<DetailsForm />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<DetailsForm />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
