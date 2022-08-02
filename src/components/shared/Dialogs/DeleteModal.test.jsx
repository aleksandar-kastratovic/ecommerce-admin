import React from "react";

import { shallow, mount } from "enzyme";

import DeleteDialog from "./DeleteDialog";

describe("<DeleteDialog />", () => {
  it("should render successfully", async () => {
    const wrapper = mount(<DeleteDialog openDeleteDialog={false} />);

    expect.assertions(1);
    expect(wrapper).toHaveLength(1);
  });
  it("should successfully handle cancel click", async () => {
    const setOpenDeleteDialog = jest.fn();
    const openDeleteDialog = true;

    const wrapper = shallow(
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
      />
    );
    wrapper
      .find('[data-test-id="confirm-dialog-cancel"]')
      .first()
      .simulate("click");
    expect(setOpenDeleteDialog).toHaveBeenCalledTimes(1);
  });
  it("should successfully handle confirm click", async () => {
    const setOpenDeleteDialog = jest.fn();
    const openDeleteDialog = true;

    const wrapper = shallow(
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
      />
    );
    wrapper
      .find('[data-test-id="confirm-dialog-confirm"]')
      .first()
      .simulate("click");
    expect(setOpenDeleteDialog).toHaveBeenCalledTimes(1);
  });
});
