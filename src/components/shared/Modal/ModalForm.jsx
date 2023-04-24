import React, { useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

import Form from "../Form/Form";
import useAPI from "../../../api/api";
import { toast } from "react-toastify";
import FormWrapper from "../Layout/FormWrapper/FormWrapper";

/**
 * Modal.
 *
 * @param anchor Side from which the drawer will appear ('bottom'|'left'|'right'|'top').
 * @param {bool} openModal Depending on what we set true or false, the modal opens or closes.
 * @param {function} setOpenModal
 * @param sx The system prop that allows defining system overrides as well as additional CSS styles.
 * @param {'permanent'|'persistent'|'temporary'} variant The variant to use.
 * @param {string} apiPathFormModal Api path.
 * @param {FieldSpec[]} formFields
 *
 * @return {JSX.Element}
 * @constructor
 */

const ModalForm = ({ anchor, openModal, setOpenModal, sx, variant, apiPathFormModal, formFields }) => {

  const { id } = openModal;
  const api = useAPI();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleData = async () => {
    setIsLoading(true);
    await api
      .get(`${apiPathFormModal}/${id}`)
      .then((response) => {
        setData(response?.payload);
      })
      .catch((error) => {
        console.warn(error);
      });
    setIsLoading(false);
  };

  const saveData = async (data) => {

    api.post(`${apiPathFormModal}`, data)
      .then((response) => {
        setData(response?.payload);
        toast.success(`Uspešno`);
        setOpenModal({ ...openModal, show: false });
      })
      .catch((error) => {
        console.warn(error);
        toast.warning("Greška");
      });
  };

  useEffect(() => {
    if (openModal.show) {
      handleData();
    }
  }, [openModal.show]);

  return (

    <Drawer anchor={anchor} open={openModal.show ?? false} onClose={() => setOpenModal({ ...openModal, show: false })} sx={sx} variant={variant}>
      <IconButton sx={{ display: "flex", alignItems: "flex-start", width: "fit-content" }} onClick={() => setOpenModal({ ...openModal, show: false })}>
        <Icon>close</Icon>
      </IconButton>
      <Box width="50rem">
        <FormWrapper title={data?.id == null ? "Novi unos" : data?.name}>
          <Form formFields={formFields} initialData={data} onSubmit={saveData} />
        </FormWrapper>
      </Box>
    </Drawer >
  )
}

export default ModalForm