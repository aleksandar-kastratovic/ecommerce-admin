import React from "react";

import { shallow, mount } from "enzyme";

import DeleteModal from "./DeleteModal";

describe("<DeleteModal />", () => {
  it("should render successfully", async () => {
    const wrapper = mount(<DeleteModal openDeleteModal={false} />);

    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
  it("should successfully handle cancel click", async () => {
    const setOpenDeleteModal = jest.fn();
    const openDeleteModal = true;

    const wrapper = shallow(
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    );
    wrapper
      .find('[data-test-id="confirm-dialog-cancel"]')
      .first()
      .simulate("click");
    expect(setOpenDeleteModal).toHaveBeenCalledTimes(1);
  });
  it("should successfully handle confirm click", async () => {
    const setOpenDeleteModal = jest.fn();
    const openDeleteModal = true;

    const wrapper = shallow(
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    );
    wrapper
      .find('[data-test-id="confirm-dialog-confirm"]')
      .first()
      .simulate("click");
    expect(setOpenDeleteModal).toHaveBeenCalledTimes(1);
  });
});
