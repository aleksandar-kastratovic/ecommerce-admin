import React from "react";

import { shallow } from "enzyme";

import CreateForm from "./CreateForm";

describe("<CreateForm />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<CreateForm />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
