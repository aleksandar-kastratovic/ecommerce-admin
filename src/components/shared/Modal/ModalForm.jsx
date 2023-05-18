import React, { useEffect, useState } from "react";

import Form from "../Form/Form";
import useAPI from "../../../api/api";
import { toast } from "react-toastify";
import FormWrapper from "../Layout/FormWrapper/FormWrapper";
import ListPageModalWrapper from "./ListPageModalWrapper";
import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box"

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
 * @param initialData
 * @param label
 * @param customTitle
 * @param shortText
 * @param cancelButton
 * @param withoutSetterFunction
 * @param styleCheckbox
 *
 * @return {JSX.Element}
 * @constructor
 */

const ModalForm = ({ anchor, openModal, setOpenModal, sx, variant, apiPathFormModal, formFields, initialData, label, customTitle, shortText, cancelButton, withoutSetterFunction = false, styleCheckbox }) => {

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
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const saveData = async (data) => {
    setIsLoading(true);
    if (!withoutSetterFunction) {
      api.post(`${apiPathFormModal}`, { ...data, ...initialData })
        .then((response) => {
          setData(response?.payload);
          toast.success(`Uspešno`);
          setOpenModal({ ...openModal, show: false });
          setIsLoading(false);
        })
        .catch((error) => {
          console.warn(error);
          toast.warning("Greška");
          setIsLoading(false);
        });

    } else {
      api.post(`${apiPathFormModal}`, { ...data, ...initialData })
        .then((response) => {
          toast.success(`Uspešno`);
          setOpenModal({ ...openModal, show: false });
          setIsLoading(false);
        })
        .catch((error) => {
          console.warn(error);
          toast.warning("Greška");
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (openModal.show) {
      handleData();
    }
  }, [openModal.show]);

  return (
    <ListPageModalWrapper anchor={anchor} open={openModal.show ?? false} onClose={() => setOpenModal({ ...openModal, show: false })} sx={sx} variant={variant} onCloseButtonClick={() => setOpenModal({ ...openModal, show: false })}>
      {!isLoading ?
        <FormWrapper title={customTitle ? customTitle : (data?.id == null ? "Novi unos" : data?.name)}>
          {shortText ? <Typography variant="body2" sx={{ marginBottom: "0.8rem" }}>{shortText}</Typography> : null}
          <Form formFields={formFields} initialData={data} onSubmit={saveData} label={label} cancelButton={cancelButton} onCancel={() => setOpenModal({ ...openModal, show: false })} styleCheckbox={styleCheckbox} />
        </FormWrapper>
        : <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}><CircularProgress size="2rem" sx={{ marginTop: "50vh" }} /></Box>}
    </ListPageModalWrapper>
  )
}

export default ModalForm