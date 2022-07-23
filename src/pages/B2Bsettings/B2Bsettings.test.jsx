import React from "react";
import { useNavigate } from "react-router-dom";
import { shallow } from "enzyme";
import { QueryClient, QueryClientProvider } from "react-query";

import B2Bsettings from "./B2Bsettings";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

const queryClient = new QueryClient();

describe("<B2Bsettings />", () => {
  beforeEach(async () => {
    // gets executed before each 'it' (test)
    jest.resetAllMocks();
    useNavigate.mockImplementation(() => ({ navigate: "/B2B-settings" }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render successfully", async () => {
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <B2Bsettings />
      </QueryClientProvider>
    );
    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
});
