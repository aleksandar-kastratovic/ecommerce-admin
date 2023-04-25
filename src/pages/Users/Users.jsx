import { useState } from "react";

import ChangePasswordDialog from "../../components/shared/ChangePasswordDialog/ChangePasswordDialog";
import ListPage from "../../components/shared/ListPage/ListPage";

import tblFields from "./tblFields.json";

const Users = () => {
  const [openDialog, setOpenDialog] = useState({ show: false, userId: null });

  const customActions = { type1: { handler: (rowData) => setOpenDialog({ show: true, userId: rowData.id }), icon: "key" } };

  return (
    <>
      <ListPage apiUrl="admin/users" title="Korisnici" columnFields={tblFields} customActions={customActions} />
      <ChangePasswordDialog openDialog={openDialog} setOpenDialog={setOpenDialog} apiPath="admin/users/reset-password" />
    </>
  );
};

export default Users;
