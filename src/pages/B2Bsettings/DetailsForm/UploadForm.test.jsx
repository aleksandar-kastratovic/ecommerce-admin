import React from "react";

import { shallow } from "enzyme";

import UploadForm from "./UploadForm";

describe("<UploadForm />", () => {
  it("should render successfully", async () => {
    const wrapper = shallow(<UploadForm />);
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
