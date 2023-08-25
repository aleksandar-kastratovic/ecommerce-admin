import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import { toast } from "react-toastify";
import useAPI from "../../../api/api";
import Button from "../../../components/shared/Button/Button";
import Buttons from "../../../components/shared/Form/Buttons/Buttons";
import { InputCheckbox, InputHtml, InputSelect } from "../../../components/shared/Form/FormInputs/FormInputs";
import HistoryModal from "./HistoryModal";

const OrderStatus = ({ orderId, status }) => {
  const api = useAPI();
  const apiPath = "admin/orders-b2c/status";

  const init = { id_order: orderId, status, send_mail: null, mail_to_customer: null, mail_to_admin: null, subject: null, content: null };

  const [data, setData] = useState(init);
  const [originalMessage, setOriginalMessage] = useState(data.content);
  const [openDialog, setOpenDialog] = useState({ show: false });
  const [sendMail, setSendMail] = useState("0");
  const [oldStatus, setOldStatus] = useState(status);

  const [loaded, setLoaded] = useState(false);

  const getMessage = (statusCode) => {
    api.get(`${apiPath}/message/${orderId}/${statusCode}`)
      .then((response) => {
        setOriginalMessage(response?.payload.content);
        setSendMail(response?.payload.send_mail);
        setData({ ...data, ...response?.payload, send_to_customer: response?.payload.send_mail === "1" });
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    getMessage(data.status);
  }, [data.status]);

  const formSubmitHandler = () => {
    let ret = {};
    if (data.send_to_customer) {
      ret = { ...data, send_default_message: data.content === originalMessage };
    } else {
      ret = { ...data, send_default_message: null, mail_to_customer: null, mail_to_customers: null, content: null, subject: null };
    }
    api.post(apiPath, ret)
      .then((response) => {
        setData({ ...data, content: originalMessage, send_to_customer: false });
        toast.success("Uspešno!");
        setOldStatus(data.status);
      })
      .catch((error) => {
        toast.warn("Greška");
        console.warn(error);
      });
  };

  return (
    <Box>
      <InputSelect
        label="Status porudžbine"
        required={true}
        name="status"
        value={data.status ?? ""}
        onChange={({ target }) => {
          setData({ ...data, [target.name]: target.value });
        }}
        fillFromApi={`${apiPath}/ddl/status`}
        usePropName={false}
        options={[]}
        styleFormControl={{ ".MuiFormLabel-root": { fontSize: "0.875rem" }, "&.MuiFormControl-root": { marginTop: "0" } }}
      />
      {sendMail === "1" && data.status !== oldStatus && (
        <>
          <InputCheckbox
            label="Pošalji poruku kupcu"
            name="send_to_customer"
            value={data.send_to_customer ?? false}
            onChange={({ target }) => {
              setData({ ...data, [target.name]: target.checked });
            }}
          />
          {data.send_to_customer && (
            <InputHtml
              label="Poruka"
              name="content"
              value={data.content ?? ""}
              onChange={({ target }) => {
                if (!loaded) {
                  setOriginalMessage(target.value);
                  setLoaded(true);
                }
                setData({ ...data, [target.name]: target.value });
              }}
            />
          )}
        </>
      )}
      <Buttons>
        <Button
          label="Istorija"
          onClick={() => setOpenDialog({ show: true })}
          sx={{
            "@media (max-width: 500px)": {
              minWidth: "fit-content !important",
              padding: "0.2rem 0.5rem !important",
            },
          }}
        />
        <Button label="Sačuvaj" variant="contained" onClick={formSubmitHandler} disabled={data.status === oldStatus} sx={{
          "@media (max-width: 500px)": {
            minWidth: "fit-content !important",
            padding: "0.2rem 0.5rem !important",
          },
        }} />
      </Buttons>
      <HistoryModal openDialog={openDialog} setOpenDialog={setOpenDialog} apiPath={`${apiPath}/${orderId}`} />
    </Box>
  );
};

export default OrderStatus;
