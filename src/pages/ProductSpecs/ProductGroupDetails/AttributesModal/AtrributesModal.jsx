import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import List from "../../../../components/shared/ListAdder/List";
import AuthContext from "../../../../store/auth-contex";
import {
  deleteProductSpecsGroupAttributeValues,
  getListProductSpecsGroupAttributeValues,
  postProductSpecsGroupAttributeValues,
} from "../../services";

import formFields from "./AttrModalForm.json";
import { repackToSend } from "./util";

const AttributesModal = ({
  open = false,
  handleClose = () => {},
  idGroup,
  idAttribute,
}) => {
  const { user } = useContext(AuthContext);

  const initList = {
    id_group: idGroup,
    id_group_attribute: idAttribute,
    slug: "",
    name: "",
    image: "empty",
    use_in_variants: 0,
    description: "",
    order: 0,
    status: "off",
  };

  const [listFields, setListFields] = useState([]);

  const handleList = async () => {
    try {
      let response = await getListProductSpecsGroupAttributeValues(
        user.access_token,
        idGroup,
        idAttribute
      );
      setListFields(response?.data?.payload?.items);
    } catch (error) {
      console.warn(error);
    }
  };

  const saveListData = async (data, index) => {
    try {
      console.log(data);
      let repack = { ...initList, id_group: idGroup, ...data };

      let response = await postProductSpecsGroupAttributeValues(
        user.access_token,
        repack
      );
      let newList = [...listFields, response?.data?.payload];
      setListFields(newList);
      toast.success("Uspešno!");
    } catch (error) {
      console.warn(error);
      toast.warning("Greška");
    }
  };

  useEffect(() => {
    if (open && idAttribute === undefined) {
      handleClose();
      toast.warning("Sačuvajte atribut da bi unosili vrednosti!");
    }

    if (open) {
      handleList();
    }
  }, [open]);

  return (
    <Dialog open={open} fullScreen>
      <DialogTitle>Unos vrednosti za select</DialogTitle>
      <DialogContent>
        <List
          listFields={listFields}
          formFields={formFields}
          init={initList}
          onDelete={() => {}}
          required={[]}
          onSave={saveListData}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Zatvori</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttributesModal;
